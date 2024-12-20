"use client";

import React, { useEffect, useState } from "react";
import { getFiles, deleteFile } from "@/utils/api";
import UploadForm from "./form";

interface File {
    file_name: string;
    file_url: string;
}

const FileList = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const fetchFiles = async () => {
        const data = await getFiles();
        setFiles(data);
    };

    const handleDelete = async (fileName: string) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${fileName}"?`
        );
        if (confirmDelete) {
            try {
                await deleteFile(fileName);
                setFiles(files.filter((file) => file.file_name !== fileName));
            } catch {
                alert("Failed to delete file.");
            }
        }
    };

    const handlePreview = (fileUrl: string) => {
        setPreviewUrl(fileUrl);
    };

    const handleNewFile = (newFile: File) => {
        setFiles((prevFiles) => [newFile, ...prevFiles]);
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Uploaded Files</h2>
            <UploadForm onUploadSuccess={handleNewFile} />
            <div style={styles.cardGrid}>
                {files.map((file) => (
                    <div
                        key={file.file_name}
                        style={styles.card}
                        onClick={() => handlePreview(file.file_url)}
                    >
                        <span style={styles.fileName}>{file.file_name}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(file.file_name);
                            }}
                            style={styles.deleteButton}
                        >
                            削除
                        </button>
                    </div>
                ))}
            </div>
            {previewUrl && (
                <div style={styles.previewOverlay} onClick={() => setPreviewUrl(null)}>
                    <img src={previewUrl} alt="Preview" style={styles.previewImage} />
                </div>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column" as const, // 型エラーを防ぐため `as const`
        alignItems: "center",
        padding: "20px",
    },
    title: {
        fontSize: "1.5rem",
        marginBottom: "20px",
    },
    cardGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        width: "100%",
        maxWidth: "1200px",
    },
    card: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        position: "relative",
    },
    fileName: { fontWeight: "bold", color: "#007bff" },
    deleteButton: {
        backgroundColor: "#ff4d4f",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
        position: "absolute",
        bottom: "10px",
        right: "10px",
    },
    previewOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    previewImage: { maxWidth: "80%", maxHeight: "80%" },
};

export default FileList;
