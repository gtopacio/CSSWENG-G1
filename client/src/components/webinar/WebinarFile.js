import axios from 'axios';
import React from 'react';

export default function WebinarFile({ file }) {
    return (
        <div onClick={(e) => {
            window.open(`/api/webinar/file?fileID=${file.fileID}&fileDocumentID=${file._id}`);
        }}>
            {JSON.stringify(file)}
        </div>
    )
}
