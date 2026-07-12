#  AI CRM CSV Importer

An AI-powered CRM CSV Importer built with **Next.js**, **Node.js**, **Express**, and **TypeScript**. The application intelligently uploads, analyzes, and maps CSV data from different formats into a standardized CRM lead structure.

## ✨ Features

- 📂 Upload CSV files
- 👀 Preview imported records
- 🤖 AI-powered field mapping
- 🔄 Supports different CSV column names
- 📊 CRM lead data extraction
- ⚡ Fast and responsive UI
- 🔗 REST API integration
- 📝 TypeScript support

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- React Dropzone
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript
- Multer
- CSV Parser
- Google Gemini API

---

## 📁 Project Structure

```
.
├── frontend
│   ├── app
│   ├── public
│   ├── package.json
│   └── next.config.ts
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── prompts
│   │   ├── routes
│   │   ├── services
│   │   └── server.ts
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/vivek1234663/-CRM-CSV-Importer.git
cd -CRM-CSV-Importer
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## API Endpoints

### Upload CSV

```
POST /api/upload
```

Uploads and parses the CSV file.

---

### Process CSV

```
POST /api/process
```

Processes CSV records and maps them into CRM fields using AI.

---

## Workflow

1. Upload CSV
2. Preview Data
3. AI analyzes headers
4. CRM field mapping
5. Review mapped data
6. Import into CRM

---

## Screenshots

- CSV Upload
- Data Preview
- AI Mapping
- CRM Result Table

---

## Future Improvements

- Drag & Drop Upload
- Authentication
- Database Integration
- Export Processed CSV
- Bulk Import
- Import History

---

<<<<<<< HEAD
=======
## Author

**Vivek Srivastava**

GitHub: https://github.com/vivek1234663

LinkedIn: https://www.linkedin.com/in/vivek-srivastava-121998248/

---

## License

This project is created for the **GrowEasy AI CSV Importer Assignment**.
>>>>>>> dda25c0 (Complete AI CSV processing feature)
