import React from "react";
import { useController } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
const Input = ({ control, name, type, hasIcon = false, ...props }) => {
  const [show, setShow] = React.useState(false);
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <div className="relative w-full h-full">
      <input
        name={name}
        type={show ? "text" : type}
        {...field}
        {...props}
      ></input>
      {hasIcon &&
        (show ? (
          <span
            className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2"
            onClick={() => setShow(false)}
          >
            <BsEye></BsEye>
          </span>
        ) : (
          <span
            className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2"
            onClick={() => setShow(true)}
          >
            <BsEyeSlash></BsEyeSlash>
          </span>
        ))}
    </div>
  );
};

export default Input;
