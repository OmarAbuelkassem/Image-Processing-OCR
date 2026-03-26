import { useMemo } from "react";

export default function FilePreview({ file }) {
  // Memoize the URL so we don't create 1000s of them on every re-render
  const previewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden min-h-[500px] flex items-center justify-center">
      {file ? (
        <div className="p-4 w-full h-full flex flex-col items-center">
          <div className="badge badge-outline mb-4 font-mono text-xs">
            {file.name}
          </div>
          <img
            src={previewUrl}
            alt="Source Document"
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl transition-all duration-500 ease-in-out"
          />
        </div>
      ) : (
        <div className="hero h-full bg-base-200/20">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <div className="text-5xl mb-4 opacity-20">📸</div>
              <p className="opacity-40 italic">
                Upload an image in the sidebar to view it here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
