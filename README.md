# Optical Character Recognition platform.

![Build Status](https://github.com/OmarAbuelkassem/Image-Processing-OCR/actions/workflows/docker-build.yml/badge.svg)
![React](https://img.shields.io/badge/React-19-blue)
![Node](https://img.shields.io/badge/Node-Express_5-green)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

A high-performance, containerized Full-Stack application designed for real-time text extraction from images. This project demonstrates a complete **CI/CD pipeline**, decoupled architecture, and industrial-grade security practices.

---

## 🚀 Key Features

- **Neural OCR Engine:** Powered by `Tesseract.js` for high-accuracy text recognition.
- **Edge Optimization:** Client-side image compression via `browser-image-compression` to reduce bandwidth and server load.
- **Automated CI/CD:** Zero-touch deployment pipeline using **GitHub Actions** and **Docker Buildx** with GHA caching.
- **Production Security:** Hardened Express backend featuring `Zod` validation, `Helmet` headers, and `Express-Rate-Limit`.
- **Container Orchestration:** Single-command environment setup with `Docker Compose`.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS 4 & DaisyUI
- **Networking:** Axios

### Backend

- **Server:** Node.js & Express 5
- **Logic:** Tesseract.js (OCR), Multer (File Handling)
- **Validation:** Zod (Schema Validation)
- **Security:** Helmet, CORS, Express-Rate-Limit

### DevOps

- **Containerization:** Docker & Docker Compose
- **Automation:** GitHub Actions
- **Registry:** Docker Hub

---

## 🏗️ Architecture & CI/CD

This project utilizes a **Continuous Integration** workflow. Every push to the `main` branch triggers a GitHub Action that:

1.  Sets up a **Docker Buildx** environment.
2.  Authenticates with **Docker Hub** via encrypted secrets.
3.  Builds the Client and Server images using **GHA Layer Caching** to optimize speed.
4.  Pushes uniquely tagged images (`github.sha`) to the registry for deployment.

---

## 🚦 Getting Started

### Prerequisites

- Docker & Docker Compose installed.

### 1. Clone & Navigate

First, pull the source code to your local machine and enter the project root:

```Bash
git clone https://github.com/OmarAbuelkassem/Image-Processing-OCR.git


cd Image-Processing-OCR
```

### 2. Launch the Stack

This project is fully orchestrated. Run the following command to build the images and start the containers (Frontend, Backend, and Database) in one go:

```Bash
docker compose up --build
```

### 3. Access the Services

Once the terminal shows the logs are stable, you can interact with the platform at the following addresses:

| Service      | URL                     | Responsibility           |
| :----------- | :---------------------- | :----------------------- |
| **Frontend** | `http://localhost:5173` | React 19 / Vite UI       |
| **Backend**  | `http://localhost:5000` | Express API / OCR Engine |
