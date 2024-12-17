import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "@/utils/api";
import Image from "next/image";

interface UploadFormProps {
    onUploadSuccess: (newFile: { file_name: string; file_url: string }) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUploadSuccess }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return;

        try {
            const uploadedFile = await uploadFile(file);
            onUploadSuccess(uploadedFile);
            alert("File uploaded successfully");
            setFile(null);
            setPreviewUrl(null);
        } catch {
            alert("Failed to upload file");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div {...getRootProps()} style={styles.dropZone as React.CSSProperties}>
                <input {...getInputProps()} />
                {previewUrl ? (
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        width={300}
                        height={300}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                    />
                ) : (
                    <p style={styles.placeholder as React.CSSProperties}>
                        Drag & drop a file here, or click to select a file
                    </p>
                )}
            </div>
            {file && (
                <p style={styles.fileName as React.CSSProperties}>
                    Selected file: <strong>{file.name}</strong>
                </p>
            )}
            <button
                type="submit"
                style={{
                    ...styles.uploadButton,
                    ...(file
                        ? {}
                        : { backgroundColor: "#ccc", cursor: "not-allowed" }),
                }}
                disabled={!file}
            >
                Upload
            </button>
        </form>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
    },
    dropZone: {
        border: "2px dashed #4CAF50",
        borderRadius: "10px",
        width: "300px",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
    },
    placeholder: {
        color: "#888",
        textAlign: "center",
    },
    fileName: {
        marginTop: "10px",
        color: "#333",
        fontSize: "0.9rem",
    },
    uploadButton: {
        marginTop: "20px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background-color 0.3s",
    },
};

export default UploadForm;
