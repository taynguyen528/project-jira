import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface DescriptionEditorProps {
    description: string;
    onDescriptionChange: (description: string) => void;
}

export const DescriptionEditor: React.FC<DescriptionEditorProps> = ({
    description,
    onDescriptionChange,
}) => (
    <div className="mt-3">
        <label className="text-[18px] font-bold">Description</label>
        <div className="mt-2">
            <div className="h-[200px] w-full">
                <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        onDescriptionChange(data);
                    }}
                />
            </div>
        </div>
    </div>
);
