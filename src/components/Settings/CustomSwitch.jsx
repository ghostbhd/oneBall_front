import { useEffect } from 'react';

const CustomSwitch = ({ isChecked, handleChange }) => 
{
    const handleToggle = () => {
        handleChange();
    };

    useEffect(() => {
        // console.log("state of isChecked",isChecked );
    }, [isChecked, handleChange]);

return (
    <label className="flex items-center cursor-pointer select-none">
        <div className="relative">
        <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            className="sr-only"
            disabled={false}
        />
        <div className="block h-6 w-12 rounded-full border-2 border-bLight_4/50 bg-bLight_1"></div>
        <div
            className={`dot absolute left-1 top-0.5 h-5 w-5 rounded-full bg-bLight_4 transition-transform duration-300 transform ${
            isChecked ? 'translate-x-5 bg-bDark_1' : 'translate-x-0 bg-gray-300'
            }`}
        ></div>
        </div>
    </label>
    );
};

export default CustomSwitch;
