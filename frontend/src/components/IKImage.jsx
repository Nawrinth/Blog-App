import { Image } from '@imagekit/react';

const IKImage = ({className , src , alt , w , h}) => {
  return (
    <div>

        <Image
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        src={src}
        className={className}
        alt={alt}
        width={w}
        height={h}
        transformation={[{ height: h, width: w }]}
        loading="lazy"
        />
    

    </div>
  )
}

export default IKImage