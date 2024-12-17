import React from "react";
import FileList from "./upload/list";

export default function Home() {
  return (
    <main style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>問題登録アプリ</h1>
      <FileList />
    </main>
  );
}
