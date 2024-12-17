import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // FastAPIのエンドポイント

export const getFiles = async () => {
    const response = await axios.get(`${BASE_URL}/files/`);
    return response.data;
};

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${BASE_URL}/upload/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const deleteFile = async (fileName: string) => {
    const response = await axios.delete(`${BASE_URL}/delete/${fileName}`);
    return response.data;
};
