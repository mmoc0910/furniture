import { debounce } from "lodash";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ onChange, ...props }) => {
  return (
    <ReactQuill
      theme="snow"
      className="w-full h-full quill-editor"
      name="productDetail"
      onChange={debounce((value) => onChange(value), 300)}
      {...props}
      modules={{
        toolbar: [
          ["bold", "italic", "underline"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
        ],
        clipboard: {
          matchVisual: false,
        },
      }}
    />
  );
};

export default QuillEditor;
