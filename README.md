# 📊 Customer Feedback Analyzer

An AI-powered full-stack web application that collects, processes, and analyzes customer feedback to generate actionable business insights using sentiment analysis and interactive dashboards.

---

## 🚀 Project Overview

Customer Feedback Analyzer is designed to help businesses automatically analyze customer feedback and extract meaningful insights. 

Instead of manually reviewing feedback, this system:
- Classifies sentiment (Positive, Neutral, Negative)
- Displays trends and KPIs
- Provides structured storage of feedback
- Enables analytics visualization through a dashboard

This project demonstrates end-to-end full-stack development with frontend, backend, API integration, and data processing.

---

## 🎯 Problem Statement

Businesses receive feedback from multiple sources such as:
- Websites
- Emails
- Reviews
- Support tickets

Manual analysis is:
- Time-consuming
- Not scalable
- Error-prone
- Lacks real-time insights

This project automates feedback analysis and presents insights visually.

---

## 🏗️ System Architecture

React Frontend → REST API (Backend) → Database

- The frontend collects and visualizes feedback.
- The backend processes sentiment and handles data storage.
- The database stores feedback records for analytics.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- Component-based architecture
- Responsive UI

### Backend
- Python
- FastAPI
- REST APIs

### Database
- MongoDB

### Tools
- Git & GitHub
- VS Code
- Postman

---

## ✨ Key Features

✔ Submit customer feedback  
✔ Automated sentiment classification  
✔ Dashboard with KPI metrics  
✔ Feedback table with filtering  
✔ API-based architecture  
✔ Scalable backend structure  

---

## 📁 Project Structure

customer-feedback-analyzer/
├── backend/
│ ├── main.py
│ ├── requirements.txt
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│
├── .gitignore
├── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/KusumanchiVinay/customer-feedback-analyzer.git

cd customer-feedback-analyzer

---

### 2️⃣ Backend Setup

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs on:
http://localhost:8000

---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

---

## 📊 Application Workflow

1. User submits feedback
2. Backend processes text using sentiment analysis
3. Data is stored in database
4. Dashboard displays analytics and KPIs
5. Business gains actionable insights

---

## 📈 Future Enhancements

- Add authentication & role-based access
- Deploy on cloud (Render / Vercel)
- Add advanced NLP models
- Add trend prediction using ML
- Export analytics as PDF

---

## 🧠 What This Project Demonstrates

This project highlights:

- Full-stack development capability
- REST API integration
- Frontend-backend communication
- Sentiment analysis fundamentals
- Clean Git workflow
- Real-world problem solving

---

## 👨‍💻 Author

**Vinay Kusumanchi**  
B.Tech CSE (AI & ML)  

GitHub: https://github.com/KusumanchiVinay  
LinkedIn: https://www.linkedin.com/in/vinay-kusumanchi

---

## 📌 Note for Recruiters

This project showcases practical implementation of:
- React-based frontend development
- API-driven backend services
- Data processing pipelines
- Scalable architecture design

The system is modular and can be extended for enterprise-level deployment.
