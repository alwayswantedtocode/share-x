import React, { useState, useRef, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";

const InputSelector = ({
  Data,
  onChange,
  label,
  value,
  inputClass,
  dropdownClass,
  listClass,
  isDarkMode,
}) => {
  const clickOutRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (value) => () => {
    onChange(value);
    setIsOpen(false);
  };

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

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        
       
      }}
      ref={clickOutRef}
    >
      <div style={inputClass} onClick={handleDropdown}>
        {label ? value[label] : value}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && (
        <ul style={dropdownClass}>
          {Data.map((option, index) => (
            <li style={listClass} key={index} onClick={onOptionClicked(option)}>
              {label ? option[label] : option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSelector;
