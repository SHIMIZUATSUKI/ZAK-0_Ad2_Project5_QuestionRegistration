"use client";

import React, { useEffect, useState } from "react";
import { getFiles, deleteFile } from "@/utils/api";

interface File {
    file_name: string;
    file_url: string;
}

const FileList = () => {
    const [files, setFiles] = useState<File[]>([]);

    const fetchFiles = async () => {
        const data = await getFiles();
        setFiles(data);
    };

    const handleDelete = async (fileName: string) => {
        await deleteFile(fileName);
        fetchFiles(); // 削除後に再取得
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.file_name}>
                        <span>
                            <a
                                href={file.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#007bff", textDecoration: "none" }}
                            >
                                {file.file_name}
                            </a>
                        </span>
                        <button onClick={() => handleDelete(file.file_name)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
