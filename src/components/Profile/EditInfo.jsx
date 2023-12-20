import { avatarImages } from "./avatarImages";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { icons } from "../../constants";
import style from "../../style";
import PropTypes from "prop-types";
import { ImgBg } from "../../style";

const EditInfo = ({ data }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(data.avatar);
  const [moreAvatars, setMoreAvatars] = useState(false);
  const [username, setUsername] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const acceptedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    if (!acceptedImageTypes.includes(file.type)) {
      alert("Only image files are allowed!");
      return;
    }

    if (file) {
      setSelectedFile(file.name);
      avatarImages.push(URL.createObjectURL(file));
      setSelectedAvatar(avatarImages[avatarImages.length - 1]);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setSelectedAvatar(data.avatar);
    setUsername("");
    setMoreAvatars(false);
  };

  

  return (
    <form action="POST" className="w-full p-6">
      {/* head ------------------------------------------------------------------ */}
      <div className={`flex flex-nowrap h-10 relative w-full text-bLight_5`}>
        <span className="h-full flex">
          <span className="my-auto">Select avatar</span>
        </span>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {/* selected file name -----------------*/}
        <div className="ml-auto w-4/12 flex h-full align-middle mr-3">
          {selectedFile ? (
            <span
              className="text-bLight_5 ml-auto text-xs font-poppins truncate h-max my-auto"
              title={selectedFile}
            >
              {selectedFile}
            </span>
          ) : (
            ""
          )}
        </div>

        {/* upload button ---------*/}
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-xs text-center bg-bLight_2 text-bDark_4 
            p-4 py-1 my-auto rounded-full hover:bg-bLight_4 transition-colors duration-500 h-max"
        >
          Upload
        </label>
      </div>

      {/* Avatar selection -------------- */}
      <div className="w-full mt-3 relative space-y-4">
        <div
          className={`w-full grid md:grid-cols-5 grid-cols-4 gap-4 relative overflow-hidden ${
            moreAvatars ? "h-max" : "lg:h-28 sm:h-[90px] h-[60px]"
          }`}
        >
          {avatarImages.map((item, index) => (
            <div
              key={index}
              className={`md:w-[90px] sm:w-[80px] lg:w-28 lg:h-28 w-[60px] md:h-[90px] sm:h-[80px] h-[60px] relative cursor-pointer mx-auto
                rounded-[25px] ${item === selectedAvatar ? "order-first" : ""} 
              `}
              style={ImgBg({ img: item })}
              onClick={() => setSelectedAvatar(item)}
            >
              {/* checked avatar --------------*/}
              {selectedAvatar === item ? (
                <div
                  className={`absolute flex w-full h-full rounded-[25px] bg-bLight_5 bg-opacity-50`}
                >
                  {
                    <icons.check className="text-[30pt] m-auto text-org_3 text-shadow" />
                  }
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        {/* more avatars button --------------------- */}
        <div
          className={`w-full flex flex-row text-bLight_5 cursor-pointer text-sm p-1.5 bg-gradient-to-r from-bLight_5/50 to-bDark_4/70 rounded-full
          `}
          onClick={() => setMoreAvatars(!moreAvatars)}
        >
          <p className="w-max mx-auto pl-4">More avatars</p>
          <div className="w-max flex items-center mr-2 text-xl">
            {moreAvatars ? <icons.up /> : <icons.down />}
          </div>
        </div>
      </div>

      {/* Edit info (change username input) ------------------- */}
      <div className={`w-full mt-6 flex flex-col`}>
        <p className="text-bLight_5">Edit info</p>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="change username"
          className="w-full bg-bLight_5 bg-opacity-30 mt-4 text-org_1 placeholder:text-bLight_4
            text-xs p-2 rounded-full outline-none border-2 border-bLight_5 border-opacity-70
          "
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {/* save and cancel buttons -------- */}
      <div className={`w-full mt-4 flex flex-row space-x-10 items-center`}>
        <p className="text-org_3 ml-auto cursor-pointer" onClick={reset}>
          Cancel
        </p>
        <input
          type="submit"
          name="submit"
          id="submit"
          value="Save"
          className={`bg-org_3 text-org_1 p-3 px-10 rounded-full cursor-pointer`}
        />
      </div>
    </form>
  );
};

EditInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EditInfo;
