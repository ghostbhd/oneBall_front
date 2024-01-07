import { useEffect } from "react";

const CustomSwitch = ({ isChecked, handleChange }) => {
  const handleToggle = () => {
    handleChange();
  };

  useEffect(() => {
    // console.log("state of isChecked",isChecked );
  }, [isChecked, handleChange]);

  return (
    <label className="flex items-center cursor-pointer ">
      {/* <div className=""> */}
        {/* <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            className="sr-only"
            disabled={false}
        /> */}
        <div
          onClick={handleChange}
          className="flex h-max p-0.5 w-12 rounded-full border-2 border-org_3/50 bg-bDark_3"
        >
          <div
          className={`dot  h-5 w-5 rounded-full bg-bLight_4 transition-transform duration-300 transform ${
            isChecked ? "ml-auto bg-org_3/90" : "ml-0 bg-org_3/40"
          }`}
        ></div>
        </div>
        
      {/* </div> */}
    </label>
  );
};

export default CustomSwitch;
