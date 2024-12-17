import React from "react";
import UploadForm from "./upload/form";
import FileList from "./upload/list";

export default function Home() {
  return (
    <main>
      <h1>File Management App</h1>
      <UploadForm />
      <FileList />
    </main>
  );
}
