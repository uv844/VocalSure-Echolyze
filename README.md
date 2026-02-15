# VocalSure – Echolyze 🎙️

VocalSure powered by Echolyze is an AI voice detection platform that analyzes audio and determines whether it is AI-generated or human spoken. This project is designed for research, verification, and educational purposes in the field of AI audio analysis.

---

## 🚀 Features

- Detect AI-generated vs human-spoken audio
- Upload and analyze audio files
- Fast and responsive web interface
- Modular and scalable architecture
- Easy local setup

---

## 🧠 Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Firebase (optional deployment)
- Node.js

---

## 📦 Prerequisites

Make sure the following are installed:

- Node.js v16 or later
- npm or yarn
- Git

(Optional)
- Firebase CLI for deployment

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/uv844/vocalsure-echolyze.git
```

### 2. Move into the project folder

```bash
cd vocalsure-echolyze
```

### 3. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 4. Environment variables

Create a file named:

```
.env.local
```

Add your configuration values:

```
NEXT_PUBLIC_API_KEY=your_key_here
NEXT_PUBLIC_PROJECT_ID=your_project_id
```

(Modify according to your backend or Firebase config.)

### 5. Run development server

```bash
npm run dev
```

Open your browser and go to:

```
http://localhost:3000
```

---

## 🧪 Usage

1. Launch the app
2. Upload or record an audio file
3. Wait for analysis
4. View AI vs Human detection result

---

## 🛠️ Build for Production

```bash
npm run build
npm start
```

---

## ☁️ Deployment (Optional – Firebase)

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Push and open a pull request

---

## ⚖️ License

This project is open-source.

---

## 👨‍💻 Author

Team Echolyze 

Project: VocalSure – Echolyze

---

⭐ If you like this project, consider giving it a star on GitHub!

