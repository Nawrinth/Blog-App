import { messageInRaw, Webhook } from "svix"
import User from "../models/user.model.js"


export const clerkWebHook =   async  (req , res) =>{
    const WEBHOOK_SECREAT = process.env.CLERK_WEBHOOK_SECREAT
    

    if (!WEBHOOK_SECREAT){
        throw new Error("Webhook secreat needed")
    }
    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECREAT);
    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({
            message:"Webhook verification failed"
        });
    }

    // console.log(evt.data)
    if (evt.type == "user.created"){
        console.log("User Id: ", evt.data.id)
        const user = new User({
            clerkUserId:evt.data.id,
            username:evt.data.username || evt.data.email_addresses[0].email_address,
            email:evt.data.email_addresses[0].email_address,
            img:evt.data.profile_img_url,
        })
        await user.save();
    }
    res.status(200).json({message:"Webhook received"});
}