import Layout from "./components/Layout";
import OCRControls from "./components/OCRControls";
import FilePreview from "./components/FilePreview";
import { OCR } from "./hooks/OCR";

function App() {
  const Ocr = OCR();

  return (
    <Layout
      title="AI OCR Scanner"
      sidebar={
        <OCRControls
          file={Ocr.file}
          setFile={(f) => {
            Ocr.setFile(f);
          }}
          setText={Ocr.setText}
          onScan={Ocr.upHandle}
          loading={Ocr.loading}
          text={Ocr.text}
          error={Ocr.error}
          setError={Ocr.setError}
          progress={Ocr.progress}
          status={Ocr.status}
        />
      }
    >
      <FilePreview file={Ocr.file} />
    </Layout>
  );
}

export default App;
