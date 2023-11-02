import { avatarImages } from "./avatarImages";
import { useState } from "react";

const EditInfo = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(avatarImages[0]);

  const handelImageClic = (image) => {
    setSelectedAvatar(image);
  };

  return (
  <form action="">
    {/* Avatar selection -------------- */}
    <div className={`w-full h-1/6 flex flex-row justify-center items-center`}>
      {avatarImages.map((image) => (
        <div
          className={`w-1/6 h-full mx-1 rounded-full`}
          key={image}
          onClick={() => handelImageClic(image)}
        >
          <img
            src={image}
            alt=""
            className={`w-full h-full rounded-full object-cover cursor-pointer`}
          />
        </div>
      ))}
    </div>
  </form>
  );
};

export default EditInfo;
