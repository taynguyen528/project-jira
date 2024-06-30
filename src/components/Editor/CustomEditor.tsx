import { useState } from "react";
import { EditorProps } from "types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const CustomEditor = ({ formInstance }: EditorProps) => {
  const [_, setValue] = useState<string>("");

  return (
    <CKEditor
      editor={ClassicEditor}
      data={formInstance?.getFieldValue("description")}
      onChange={(_, editor) => {
        const data = editor.getData();

        formInstance?.setFieldValue("description", data);
        setValue(data);
      }}
    />
  );
};
