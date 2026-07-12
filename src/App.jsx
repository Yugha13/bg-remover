import { useState } from "react";
import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [original, setOriginal] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function removeBackground() {
    if (!file) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("image_file", file);

    try {
      const res = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to remove background");
      }

      const blob = await res.blob();
      setResult(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">Background Remover</div>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1>Remove image backgrounds.</h1>
          <p>Instant, clean PNGs. No signup. No noise. Just drop your image and let our AI do the magic.</p>

          <div className="upload-card">
            {!file ? (
              <label className="dropzone">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const f = e.target.files[0];
                      setFile(f);
                      setOriginal(URL.createObjectURL(f));
                      setResult(null);
                      setError(null);
                    }
                  }}
                />
                <div className="dropzone-content">
                  <svg className="dropzone-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Click or drag and drop to upload</span>
                </div>
              </label>
            ) : (
              <div className="preview-container">
                <div className="image-box" style={{ marginBottom: "24px", maxHeight: "300px" }}>
                  <img src={original} alt="Original uploaded image" />
                </div>
                
                {error && <div style={{ color: "#ef4444", marginBottom: "16px", textAlign: "center" }}>{error}</div>}
                
                <button 
                  className="primary-button" 
                  onClick={removeBackground} 
                  disabled={loading || result}
                >
                  {loading ? (
                    <>
                      <svg className="spinner" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Removing Background...
                    </>
                  ) : result ? (
                    "✓ Background Removed"
                  ) : (
                    "Remove Background"
                  )}
                </button>
                
                {(result || loading) && (
                  <button 
                    style={{ marginTop: '12px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    className="primary-button"
                    onClick={() => {
                      setFile(null);
                      setOriginal(null);
                      setResult(null);
                      setError(null);
                    }}
                    disabled={loading}
                  >
                    Upload Another Image
                  </button>
                )}
              </div>
            )}
          </div>

          {result && (
            <div className="preview-section">
              <div className="image-container">
                <h3>Original</h3>
                <div className="image-box">
                  <img src={original} alt="Original" />
                </div>
              </div>
              <div className="image-container">
                <h3>Result</h3>
                <div className="image-box">
                  <img src={result} alt="Background Removed" />
                </div>
                <a className="download-link" href={result} download="background-removed.png">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download High-Res PNG
                </a>
              </div>
            </div>
          )}
        </section>

        <section className="features">
          <div className="feature-card">
            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <h3>Lightning Fast</h3>
            <p>Powered by advanced AI models that remove backgrounds in seconds with incredible precision.</p>
          </div>
          <div className="feature-card">
            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <h3>Privacy First</h3>
            <p>Images are processed securely and never stored on our servers. Your data belongs to you.</p>
          </div>
          <div className="feature-card">
            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <h3>High Quality</h3>
            <p>We preserve fine details like hair and fur, giving you clean, professional-grade cutouts.</p>
          </div>
        </section>
      </main>

      <footer className="credit">
        Crafted by{" "}
        <a href="https://yugha.me" target="_blank" rel="noreferrer">
          Yugha
        </a>
      </footer>
    </div>
  );
}