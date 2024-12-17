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
        // 確認ダイアログを表示
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${fileName}"?`
        );

        // ユーザーがOKを押した場合のみ削除処理を実行
        if (confirmDelete) {
            try {
                await deleteFile(fileName);
                fetchFiles(); // 削除後にリストを再取得
                alert("File deleted successfully.");
            } catch {
                alert("Failed to delete file.");
            }
        }
    };


    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>ファイルをアップロード</h2>
            <ul style={styles.list}>
                {files.map((file) => (
                    <li key={file.file_name} style={styles.listItem}>
                        <span>
                            <a
                                href={file.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.link}
                            >
                                {file.file_name}
                            </a>
                        </span>
                        <button
                            onClick={() => handleDelete(file.file_name)}
                            style={styles.deleteButton}
                        >
                            削除
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// CSS-in-JSスタイル設定
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
    },
    title: {
        fontSize: "1.5rem",
        marginBottom: "10px",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    listItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: "600px",
        marginBottom: "10px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    link: {
        color: "#007bff",
        textDecoration: "none",
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#ff4d4f",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default FileList;
