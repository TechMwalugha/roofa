import classNames from "classNames";
import React, { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"input">;


const CustomFileSelector = (props: Props) => {
  return (
    <input
      {...props}
      type="file"
      multiple = {true}
      className={classNames({
        // Modify the Button shape, spacing, and colors using the `file`: directive
        // button colors
        "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100": true,
        "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
        "file:px-4 file:py-2 file:mr-4 file:border-none": true,
        // overall input styling
        "hover:cursor-pointer border w-full shadow-count rounded-lg text-gray-400": true,
      })}
    />
  );
};

export default CustomFileSelector;