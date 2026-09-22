import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';

const CustomEditor = ({ value, onChange, placeholder = 'Write something...', className, ...props }) => {
  const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['image', 'clean']
    ],
  };

  return (
    <div className={`custom-quill-editor ${className || ''}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        style={{ height: '150px', marginBottom: '40px' }} // 40px margin bottom to account for the toolbar
        {...props}
      />
      <style>{`
        .custom-quill-editor .ql-container {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          border-color: #e3e3e3;
        }
        .custom-quill-editor .ql-toolbar {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-color: #e3e3e3;
          background-color: #f8f9fa;
        }
        .custom-quill-editor .ql-editor {
          min-height: 100px;
        }
      `}</style>
    </div>
  );
};

export default CustomEditor;
