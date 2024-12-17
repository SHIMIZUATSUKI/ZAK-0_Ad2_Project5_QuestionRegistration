"use client";

import React, { useState } from "react";
import { uploadFile } from "@/utils/api";
import Image from "next/image";

const UploadForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            // 画像プレビューURL生成
            const fileUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(fileUrl);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return;

        try {
            await uploadFile(file);
            alert("File uploaded successfully");
            setFile(null);
            setPreviewUrl(null);
        } catch {
            alert("Failed to upload file");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ border: "2px dashed #4CAF50", width: "300px", height: "200px", position: "relative" }}>
                {previewUrl ? (
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        layout="fill"
                        objectFit="cover"
                    />
                ) : (
                    <p style={{ textAlign: "center", marginTop: "50px", color: "#888" }}>
                        Choose a file to upload
                    </p>
                )}
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="fileInput"
                />
            </div>
            <button type="submit" style={{ marginTop: "20px" }}>Upload</button>
        </form>
    );
};

export default UploadForm;
