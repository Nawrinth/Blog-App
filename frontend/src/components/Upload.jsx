import React, { useRef } from 'react';
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import IKImage from "./IKImage"
const authenticator = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};

const Upload = ({ setData, setProgress }) => {
    
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);

    const handleUploadImage = async (inputRef , isImage) => {
        const fileInput = inputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }

        const file = fileInput.files[0];

        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }

        const { signature, expire, token, publicKey } = authParams;

        const abortController = new AbortController(); // declared here to avoid undefined error

        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                onProgress: (event) => {
                    if (setProgress) {
                        setProgress((event.loaded / event.total) * 100);
                    }
                },
                abortSignal: abortController.signal,
            });
            inputRef.current.value = null;
            console.log("Upload response:", uploadResponse);
            if (isImage) {
                setData((prev) =>
                    prev +
                    `<p>
                        <img src="${uploadResponse.url}" alt="uploaded"
                        class="quill-upload-img"  />
                    </p>`
                );
            } else {
               setData((prev) =>
                    prev +
                    `<p>
                        <iframe 
                        class="ql-video"
                        src="${uploadResponse.url}"/>
                    </p>`
                    );

            }
            



            // return uploadResponse;
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
        }
    };

    return (
        <div className="flex flex-row gap-4 mt-2 px-2">
            <label htmlFor="images" className="cursor-pointer">
                🖼️
                <input
                    id="images"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imageInputRef}
                    onChange={() => handleUploadImage(imageInputRef , true)}
                />
            </label>

            <label htmlFor="videos" className="cursor-pointer">
                🎥
                <input
                    id="videos"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    ref={videoInputRef}
                    onChange={() => handleUploadImage(videoInputRef , false)}
                />
            </label>
        </div>
    );
};

export default Upload;
