import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);

  const inputType = visible ? "text" : "password";

  const Icon: JSX.Element = (
    <BsEye
      onClick={setVisible((prev) => !prev)}
      // className={`${visibl}`}
    />
  );

  // console.log(Icon)
  return [inputType, Icon];
};

export default usePasswordToggle;
