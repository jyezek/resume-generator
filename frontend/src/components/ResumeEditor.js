// ResumeEditor.js
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import 'ckeditor5/ckeditor5.css';

const ResumeEditor = ({ initialContent, onContentChange }) => {
  const [editorData, setEditorData] = useState(initialContent || '');

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    if (onContentChange) {
      onContentChange(data);
    }
  };

  return (
    <div className="editor-container">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleEditorChange}
        config={ {
            toolbar: {
                items: [ 'undo', 'redo', '|', 'bold', 'italic' ],
            },
            plugins: [
                Bold, Essentials, Italic, Mention, Paragraph,  Undo
            ],

            mention: {
                // Mention configuration
            },
            initialData: '<p>Hello from CKEditor 5 in React!</p>',
        } }
      />
    </div>
  );
};

export default ResumeEditor;
