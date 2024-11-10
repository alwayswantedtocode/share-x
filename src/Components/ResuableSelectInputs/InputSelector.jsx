
import React, { useState, useRef, useEffect } from 'react';
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

// Define prop types for the component
const InputSelector = ({
  Data, 
  onChange,
  label, 
  value,
  name, 
  inputClass,
  dropdownClass, 
  listClass,
  isDarkMode,
}) => {
  const clickOutRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(null);

  // Define style for the dropdown
  const ulStyle = `h-max w-[100%] absolute top-[4.4rem] border-[1px] rounded-[6px] border-[#d0c8c8] bg-[#f2f2f2] py-[3px] shadow-md ${dropdownClass}`;

  // Handle dropdown toggle
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option click from the dropdown
  const onOptionClicked = (option, index) => () => {
    setActive(index); // Set active state to the current index

    // Mimic an event object structure to pass to onChange
    const event = {
      target: {
        name,
        value: option.value, // Set the full object (label, value) as the selected value
      },
    };

    onChange(event); // Pass the selected value to the parent component
    setIsOpen(false); // Close the dropdown
  };

  // Close dropdown if clicked outside
  const handleClickOut = (e) => {
    if (!clickOutRef.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);
    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, []);

  // Display the current value of the input
  const getValue = () => {
    return value ? value : 'Select...'; // Display the label of the selected option
  };

  return (
    <div  style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }} ref={clickOutRef}>
      {/* Dropdown Input */}
      {label && <label className="text-gray-500 mb-2">{label}</label>}
      <div
        style={inputClass}
        onClick={handleDropdown}
      >
        <div className="flex items-center border-1 w-[70%] h-[100%]">
          {getValue()} {/* Display the selected label */}
        </div>
        <div className="flex items-center h-[2.2875rem] border-l-1 font-medium text-xl">
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <ul style={dropdownClass}>
          {Data.map((option, index) => (
            <li
              style={listClass}
              key={index}
              onClick={onOptionClicked(option, index)}
            >
              {option.label} {/* Ensure you're displaying the label */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSelector;
