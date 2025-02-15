import React from "react";
import fileEmpty from "../../../assets/file-empty.svg";
import fileUploaded from "../../../assets/file-uploaded.svg";

interface GenerateCsvInputComponentProps {
  id: string;
  file: File | null;
  extractFilename: (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => void;
  label: string;
}

const GenerateCsvInputComponent: React.FC<GenerateCsvInputComponentProps> = ({
  id,
  file,
  extractFilename,
  label,
}) => {
  return (
    <>
      <label htmlFor={id} className="flex flex-col justify-between">
        <input
          required
          type="file"
          onChange={(e) => extractFilename(e, id)}
          name={id}
          id={id}
          className="hidden"
        />
        <span>
          <img src={file ? fileUploaded : fileEmpty} alt="" className="w-25" />
          <p
            className="text-sm w-25 overflow-hidden text-ellipsis whitespace-nowrap"
            title={file ? file.name : "No File Founds"}
          >{`${file ? file.name : "No File Found"}`}</p>
        </span>
        {label}
      </label>
    </>
  );
};

export default GenerateCsvInputComponent;
