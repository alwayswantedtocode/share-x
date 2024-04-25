import React, { useState, useRef, useEffect } from 'react';
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from 'react-icons/fi';

interface InputSelectorProps {
    Data: any[];
    onChange: (value: {}) => void;
    label?: any;
    value: any;
    inputClass?: string; // Tailwind classes for the input div
    dropdownClass?: string; // Tailwind classes for the dropdown list
    listClass?: string; // Tailwind classes for the dropdown list

}

const InputSelector: React.FC<InputSelectorProps> = (props: InputSelectorProps) => {

    const clickOutRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onOptionClicked = (value: {}) => () => {
        props.onChange(value);
        setIsOpen(false);
    };

    const handleClickOut = (e: MouseEvent): void => {
        if (!clickOutRef.current?.contains(e.target as Node)) {
            setIsOpen(false);
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOut)

        return () => {
            document.removeEventListener("mousedown", handleClickOut)
        }
    }, [])

    return (
        <div className={`w-max flex flex-col justify-center items-center `} ref={clickOutRef}>
            <div className={`border-[1px] rounded-[4px] border-none  ${props.inputClass}`} onClick={handleDropdown} >{props.label ? props.value[props.label] : props.value}
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {isOpen &&
                <ul className={` rounded-[4px] border-none p-[0.4rem] mt-[0.2rem] shadow-md ${props.dropdownClass}`}>
                    {props.Data.map((option, index) => (
                        <li className={` rounded-[4px] pointer  ${props.listClass}`} key={index} onClick={onOptionClicked(option)}>{props.label ? option[props.label]:option}</li>
                    ))}
                </ul>}
        </div>
    );
};

export default InputSelector;
