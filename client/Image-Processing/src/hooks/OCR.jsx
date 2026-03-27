import axios from "axios";
import imageCompression from "browser-image-compression";
import { useState } from "react";

export const OCR = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  const upHandle = async () => {
    if (!file) return alert("Please Upload a file.");
    setLoading(true);
    setError(null);
    setProgress(0);
    setStatus("Uploading...");

    // Start the "Fake" Progress Timer
    const progressTimer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 30) {
          return oldProgress + 5; // Fast jump to 30
        }
        if (oldProgress < 90) {
          setStatus("Server is analyzing text...");
          return oldProgress + 1; // Slow crawl to 90
        }
        return oldProgress; // Pause at 90 until server responds
      });
    }, 200); // Runs every 200ms

    try {
      // File Compression
      let fileToUpload = file;
      if (fileToUpload.size > 4 * 1024 * 1024) {
        console.log("File is too big, we will compress it..");
        const options = {
          maxSizeMB: 2, // Increase to 2MB (Safe for your 4MB Zod limit)
          maxWidthOrHeight: 2560, // Increase resolution (2K is better for text)
          useWebWorker: true,
          initialQuality: 0.9, // Keep 90% quality (Default is often lower)
        };
        fileToUpload = await imageCompression(file, options);
      } else {
        console.log("no need for compression");
      }
      console.log(
        `Original Image size: ${(file.size / 1024 / 1024).toFixed(2)} MB. and the Compressed Image size: ${(fileToUpload.size / 1024 / 1024).toFixed(2)} MB.`,
      );

      const container = new FormData();
      container.append("image", fileToUpload);

      const response = await axios.post(
        "http://localhost:7860/image/upload",
        container,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      clearInterval(progressTimer);
      setProgress(100);
      setStatus("Success!");
      setText(response.data.extractedText);
    } catch (error) {
      clearInterval(progressTimer);
      setProgress(0);
      console.error("Error sending request", error);
      const errorMssg =
        error.response?.data?.ErrorMessage || "Something went wrong";
      setError(errorMssg);
    } finally {
      setLoading(false);
    }
  };
  return {
    file,
    setFile,
    text,
    setText,
    loading,
    error,
    setError,
    progress,
    status,
    upHandle,
  };
};
