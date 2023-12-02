import { avatarImages } from "./avatarImages";
import { useState } from "react";
import { icons } from "../../constants";
import style from "../../style";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import { useNavigate } from 'react-router-dom';

const EditInfo = ({ data }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(data.avatar);
  const [moreAvatars, setMoreAvatars] = useState(false);
  const [username, setUsername] = useState(null);
  const [fileTosend, setSelectedFileTosend] = useState(null); 


  const loadImage = async (path) => {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const binaryString = new TextDecoder().decode(arrayBuffer);
    // console.log( "jsssssssssssssson" +  binaryString);
    return binaryString;
  };

const loadImageAsFile = async (path) => {
    const imagePath = path;

    const response = await fetch(imagePath);
    const blob = await response.blob();

    // Extract the file name from the path
    const fileName = imagePath.split('/').pop();

    // Create a File object
    const file = new File([blob], fileName, { type: blob.type });

    setSelectedFileTosend(file);
  };

  const  history = useNavigate ();
  const handleRedirect = (url) => {
    history(url);
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(
      selectedAvatar
    )
    
    const formData = new FormData();
    formData.append('username', username);
    // await loadImageAsFile(selectedAvatar);
    if (fileTosend == null)
    {
      console.log("hello my friend");
      formData.append('filepath', selectedAvatar)
    }
    console.log( "jsssssssssssssson" +  fileTosend);
    formData.append('file', fileTosend);
    const headers = new Headers();
    const jwtCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='));
      if (jwtCookie) {
        const jwt = jwtCookie.split('=')[1];
    headers.append('Authorization', `Bearer ${jwt}`)
   }   // /* alert */("Only image files are allowed!");
    else {
       handleRedirect('/Auth'); 
      }
    const response = await fetch('http://localhost:3009/upload', {
      method: 'POST',
      body: formData,
      headers: headers,
    })
      .then(response => {
        if (response.ok) {
          return response.json();}
        })
      .then((data) => {
        console.log("this the result of the fetch..." + data.accessToken);
    Cookies.set('accessToken', data.accessToken);
    })
   .catch ((error) => {
    console.error('Error during file upload:', error);
  })
      console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer');
    window.location.reload();
  }; 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const acceptedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    console.log(file);
    if (!acceptedImageTypes.includes(file.type)) {
      alert("Only image files are allowed!");
      return;
    }
       
      console.log('heeeeeeeeeeeeeeeeeeeeeeeeiiiiiiiiiiiiiiiiiiiieeeeeeeeeeeeeeeeeeeeer');
      // console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer');
    if (file) {
      console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer');
      setSelectedFile(file.name);
      setSelectedFileTosend(file);
      avatarImages.push(URL.createObjectURL(file));
      // console.log(avatarImages);
      setSelectedAvatar(avatarImages[avatarImages.length - 1]);
      console.log( "----------->" + selectedAvatar);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setSelectedAvatar(data.avatar);
    setUsername("");
    setMoreAvatars(false);
  };
  const SaveAvatar = (e) => {
    // e.preventDefault();
    // const file = e.target.files[0];
    // console.log("uuuuuuuu"+ file)
      // console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer' + file.json());
      // avatarImages.push(URL.createObjectURL(e));
      setSelectedAvatar(e);
      setSelectedFileTosend(e);
  }
  const imagebg = ({ img }) => ({
        backgroundImage: `url('${img}')`,
    backgroundSize: `cover`,
    backgroundPosition: `center`,
  });

  return (
    <form action="POST" className="w-full p-6" onSubmit = {handleSubmit} >
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
          className={`w-full grid grid-cols-5 gap-4 relative overflow-hidden ${
            moreAvatars ? "h-max" : "h-[90px]"
          }`}
        >
          {avatarImages.map((item, index) => (
            <div
              key={index}
              className={`w-[90px] h-[90px] relative cursor-pointer mx-auto
                ${style.rounded} ${
                item === selectedAvatar ? "order-first" : ""
              } 
              `}
              style={imagebg({ img: item })}
              onClick={() => setSelectedAvatar(item)}
            >
              {/* checked avatar --------------*/}
              {selectedAvatar === item ? (
                <div
                  className={`absolute flex w-full h-full ${style.rounded} bg-bLight_5 bg-opacity-50`}
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
