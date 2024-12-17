"use client";

import React, { useState } from "react";
import { uploadFile } from "@/utils/api";

const UploadForm = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return;
        await uploadFile(file);
        alert("File uploaded successfully");
        setFile(null); // アップロード後、ファイル入力をリセット
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadForm;
