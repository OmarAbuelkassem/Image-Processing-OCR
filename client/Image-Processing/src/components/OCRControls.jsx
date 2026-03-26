export default function OCRControls({
  setFile,
  onScan,
  setText,
  loading,
  text,
  error,
  setError,
  progress,
  status,
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Upload Card */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-5">
          <h2 className="card-title text-xs opacity-60 uppercase">Controls</h2>
          {error && (
            <div className="alert alert-error text-xs py-2 mb-2 rounded-md shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <input
            type="file"
            className="file-input file-input-sm file-input-bordered file-input-primary w-full"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setText(""); // Clear old text when new file picked
              setError("");
            }}
          />
          {loading && (
            <div className="w-full animate-in fade-in duration-300">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] font-bold uppercase opacity-70">
                  {status}
                </span>
                <span className="text-[10px] font-mono">{progress}%</span>
              </div>
              <progress
                className="progress progress-primary w-full h-1.5"
                value={progress}
                max="100"
              ></progress>
            </div>
          )}
          <button
            className={`btn btn-primary btn-sm mt-2 ${loading ? "loading" : ""}`}
            onClick={onScan}
            disabled={loading}
          >
            {loading ? "Scanning..." : "Extract Text"}
          </button>
        </div>
      </div>

      {/* 2. Results Card (Small dive below sidebar) */}
      <div className="card bg-base-100 shadow-md border border-base-300 min-h-[200px]">
        <div className="card-body p-5">
          <div className="flex justify-between items-center mb-2">
            <h2 className="card-title text-xs opacity-60 uppercase">
              Extracted Text
            </h2>
            {text && (
              <button
                className="btn btn-xs btn-ghost"
                onClick={() => navigator.clipboard.writeText(text)}
              >
                Copy
              </button>
            )}
          </div>

          {text ? (
            <div className="bg-base-200 p-3 rounded text-xs font-mono whitespace-pre-wrap max-h-[400px] overflow-y-auto">
              {text}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 opacity-30 text-center">
              <p className="text-xs">No text extracted yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
