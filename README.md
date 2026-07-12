# Background Remover

A premium, fast, and free web app to remove image backgrounds instantly.

No signup. No noise. Just clean PNGs.

---

## 🚀 Live Demo

👉 https://bg-remover-wheat-eight.vercel.app

---

## ✨ Features

- **Lightning Fast:** Powered by advanced AI models that remove backgrounds in seconds with incredible precision.
- **Privacy First:** Images are processed securely and never stored on our servers. Your data belongs to you.
- **High Quality:** We preserve fine details like hair and fur, giving you clean, professional-grade cutouts.
- **No authentication or watermarks.**

---

## 🧠 Tech Stack

- React + Vite
- Vercel Serverless Functions
- remove.bg API
- Vanilla CSS (Premium Glassmorphism UI)

---

## 🖥️ How It Works

1. **Upload an image** by clicking the dropzone or dragging a file.
2. **Preview** your original image.
3. Click **Remove Background**. Your image is sent to a serverless API and processed securely using remove.bg.
4. **Compare** the original and the result side-by-side.
5. **Download** the high-resolution PNG instantly.

---

## 🔐 Environment Variables

Create a `.env` file and add your API key from [remove.bg](https://www.remove.bg/api):

```env
REMOVE_BG_API_KEY=your_remove_bg_api_key
```

## 🛠️ Local Development

1. Clone this repository
2. Install dependencies using `bun install`, `npm install`, or `yarn`.
3. Create a `.env` file in the root directory (see above).
4. Run the development server: `bun dev` (or `npm run dev`).
