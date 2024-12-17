import React from "react";
import UploadForm from "./upload/form";
import FileList from "./upload/list";

export default function Home() {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>問題登録アプリ</h1>
      <UploadForm />
      <FileList />
    </main>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
};
