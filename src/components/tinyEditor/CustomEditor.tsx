import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { EditorProps } from "../../types/BaseProps.itf";
import { initEditorConfig } from "./editorConfig";

const CustomEditor = ({ name, className, formInstance }: EditorProps) => {
  const [value, setValue] = useState<string>("");
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const handleChange = (newValue: string, editor: TinyMCEEditor) => {
    formInstance?.setFieldValue("description", newValue);
    setValue(newValue);
  };

  return (
    <Editor
      value={formInstance?.getFieldValue("description")}
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={initEditorConfig}
      onEditorChange={handleChange}
    />
  );
};

export default CustomEditor;
