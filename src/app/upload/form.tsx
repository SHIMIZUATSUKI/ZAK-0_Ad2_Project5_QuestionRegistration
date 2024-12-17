"use client";

import React, { useState } from "react";
import { uploadFile } from "@/utils/api";

const UploadForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            // プレビューURL生成
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
            alert("Upload failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.uploadBox} onClick={() => document.getElementById("fileInput")?.click()}>
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" style={styles.previewImage} />
                ) : (
                    <p style={styles.text}>Choose a file to upload</p>
                )}
                <input id="fileInput" type="file" onChange={handleFileChange} style={styles.fileInput} />
            </div>
            <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
    );
};

const styles = {
    form: { display: "flex", flexDirection: "column", alignItems: "center" },
    uploadBox: { border: "2px dashed #4CAF50", borderRadius: "12px", width: "300px", height: "200px" },
    previewImage: { width: "100%", height: "100%", objectFit: "cover" },
    text: { textAlign: "center", marginTop: "50px", color: "#888" },
    fileInput: { display: "none" },
    submitButton: { marginTop: "20px", padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none" }
};

export default UploadForm;
