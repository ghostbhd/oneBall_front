import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../themeContext";
import style, { ImgBg } from "../../style";
import { icons } from "../../constants";
import Cookies from "js-cookie";
import config from "../../config";
import { avatarImages } from "../Profile/avatarImages";
import { GetHeaders } from "../../jwt_token";

const FirstTime = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([] as any);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [moreAvatars, setMoreAvatars] = useState(false);
  const [username, setUsername] = useState("");
  const [fileTosend, setSelectedFileTosend] = useState(null);
  const [error, setError] = useState("");

  const history = useNavigate();
  const headers = GetHeaders().headers;

  window.history.replaceState(null, null, "/");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(config.domain + "/profileData", {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        Cookies.remove("accessToken");
        history("/auth");
        console.log("Unauthorized. Please log in.");
        return;
      }
      const data = await response.json();
      console.log("Index profile data:", data.editInnfo);
      setData(data.editInnfo);
      const initialAvatar = data.editInnfo.avatar;
      if (!avatarImages.includes(initialAvatar))
        avatarImages.push(initialAvatar);
      setSelectedAvatar(initialAvatar);
      setLoading(false);
    };
    fetchData();
  }, [loading]);

  // Submit form ---------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = /[A-Z !@#$%^&*(),.?":{}|<>]/;

    if (
      username.length &&
      (username.length < 3 || username.length > 10 || regex.test(username))
    ) {
      setError(
        "Username must be 3-10 characters long and contain only letters"
      );
      setUsername("");
      return;
    }

    setError("");
    setUsername("");

    const formData = new FormData();
    formData.append("username", username);
    // await loadImageAsFile(selectedAvatar);
    if (fileTosend == null) {
      formData.append("filepath", selectedAvatar);
    }
    formData.append("file", fileTosend);
    const headers = new Headers();
    const jwtCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="));
    if (jwtCookie) {
      const jwt = jwtCookie.split("=")[1];
      headers.append("Authorization", `Bearer ${jwt}`);
    } // /* alert */("Only image files are allowed!");
    else {
      history("/Auth");
    }
    const response = await fetch(config.domain + "/upload", {
      method: "POST",
      body: formData,
      headers: headers,
    });
    if (response.ok) {
      console.log("the object ", response);
      const data = await response.json();
      console.log("the user is ", data.user);
      console.log("accessToken ", data.accessToken);
      Cookies.set("accessToken", data.accessToken);
      history("/");
      setLoading(!loading);
      return data;
    }
  };

  // File handling -------------------------------------------------------------
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
      setSelectedFileTosend(file);
      avatarImages.push(URL.createObjectURL(file));
      setSelectedAvatar(avatarImages[avatarImages.length - 1]);
    }
  };

  const reset = () => {
    history("/");
  };

  return (
    <div className="fixed h-full w-full left-0 top-0 z-50 flex bg-bDark_5">
      <div className="sm:w-8/12 w-11/12 md:w-5/12 m-auto">
        <form
          action="POST"
          className={`w-full p-6 ${style.blueBlur} ${style.rounded}`}
          onSubmit={handleSubmit}
        >
          {/* head ------------------------------------------------------------------ */}
          <div
            className={`flex flex-nowrap h-10 relative w-full text-bLight_5`}
          >
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
                moreAvatars ? "h-max" : "xl:h-28 sm:h-[90px] h-[60px]"
              }`}
            >
              {avatarImages.map((item, index) => (
                <div
                  key={index}
                  className={`md:w-[90px] sm:w-[80px] xl:w-28 xl:h-28 w-[60px] md:h-[90px] sm:h-[80px] h-[60px] relative cursor-pointer mx-auto
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
          <div className={`w-full mt-6 gap-4 flex flex-col`}>
            <p className="text-bLight_5">Edit info</p>
            <div className={`w-full flex flex-col gap-0.5`}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={`current username : @${data.username}`}
                className="w-full bg-bLight_5 bg-opacity-30 text-org_1 placeholder:text-bLight_3
                            text-xs p-2 rounded-full outline-none border-2 border-bLight_5 border-opacity-70
                          "
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              {error.length > 0 ? (
                <p className={`text-xs pl-4 text-org_3`}>{error}</p>
              ) : null}
            </div>
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
      </div>
    </div>
  );
};

export default FirstTime;
