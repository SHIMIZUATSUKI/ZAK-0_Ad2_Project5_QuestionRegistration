"use client";

import React, { useState } from "react";
import { uploadFile } from "@/utils/api";

const UploadForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // ファイル選択時の処理
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            // 画像プレビュー用のURL生成
            const fileUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(fileUrl);

            setIsSubmitted(false);
        }
    };

    // Submit処理
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return;

        try {
            await uploadFile(file);
            alert("File uploaded successfully");
            setFile(null);
            setPreviewUrl(null);
            setIsSubmitted(true);
        } catch (error) {
            alert("Upload failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div
                style={styles.uploadBox}
                onClick={() => document.getElementById("fileInput")?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files[0]) {
                        setFile(e.dataTransfer.files[0]);
                        const fileUrl = URL.createObjectURL(e.dataTransfer.files[0]);
                        setPreviewUrl(fileUrl);
                    }
                }}
            >
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" style={styles.previewImage} />
                ) : (
                    <div style={styles.placeholder}>
                        <p style={styles.text}>ファイルを選択してください</p>
                        <span style={styles.icon}>⬆️</span>
                    </div>
                )}
                <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    style={styles.fileInput}
                />
            </div>
            {file && (
                <button type="submit" style={styles.submitButton}>
                    登録
                </button>
            )}
        </form>
    );
};

// CSS-in-JSスタイル設定
const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
    },
    uploadBox: {
        width: "100%",
        maxWidth: "400px",
        height: "250px",
        border: "2px dashed #4CAF50",
        borderRadius: "12px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
    },
    fileInput: {
        position: "absolute",
        opacity: 0,
        width: "100%",
        height: "100%",
        cursor: "pointer",
    },
    placeholder: {
        textAlign: "center",
        color: "#666",
    },
    text: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: "8px",
    },
    icon: {
        fontSize: "2rem",
        color: "#4CAF50",
    },
    previewImage: {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        borderRadius: "10px",
    },
    submitButton: {
        marginTop: "20px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default UploadForm;

