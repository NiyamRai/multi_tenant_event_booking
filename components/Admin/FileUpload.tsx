import React, { useRef, useState } from "react";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  folder?: string;
}

export default function FileUpload({
  onUploadComplete,
  folder = "testing",
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("folder", folder);

    try {
      setIsUploading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/file-upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      if (data?.file) {
        onUploadComplete(data.file);
        console.log("Uploaded file URL:", data.file);
        setSelectedFile(null);
        setPreviewUrl(null);
        setShowModal(false);
        if (inputRef.current) {
          inputRef.current.value = ""; // Clear file input value
        }
      } else {
        throw new Error("Upload failed.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown upload error.";
      setError(errorMessage || "Upload error.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError("");
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear file input
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    handleClear(); // Clear any selected file when closing modal
  };

  return (
    <div className="relative">
      {/* Button for the file input */}
      <div
        className="xl:w-[273px] xl:h-[114px] w-[180px] h-[100px] border-2 border-dashed border-black rounded-xl cursor-pointer transition relative bg-gray-50"
        onClick={() => setShowModal(true)} // Open modal on click of + sign
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-full">
              <span className="text-black text-3xl">+</span>
            </div>
          </div>
        )}
      </div>

      {/* Modal for file upload */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-slate-100 p-8 rounded-lg shadow-lg w-[500px] relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Upload an Image</h2>
              {/* Close Button */}
              <button
                className="text-2xl text-gray-500 hover:text-gray-700"
                onClick={handleModalClose}
              >
                &times;
              </button>
            </div>

            {/* File input */}
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="w-full border p-2 rounded-md"
              />
            </div>

            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

            {/* Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-1 rounded-md"
                onClick={handleClear}
                disabled={!selectedFile}
              >
                Clear
              </button>

              <button
                className="bg-primary-max hover:bg-blue-800 text-white text-sm px-4 py-1 rounded-md"
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
