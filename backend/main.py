from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from sentiment import analyze_sentiment
from keyword_extractor import extract_keywords
from report import generate_csv
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("mongodb://localhost:27017/")
db = client["feedbackDB"]
collection = db["feedbacks"]

@app.post("/submit")
def submit_feedback(data: dict):
    sentiment, score = analyze_sentiment(data["feedback"])

    feedback = {
        "name": data.get("name", "Anonymous"),
        "product": data["product"],
        "rating": data["rating"],
        "feedback": data["feedback"],
        "sentiment": sentiment,
        "score": score,
        "date": datetime.now()
    }

    collection.insert_one(feedback)
    return {"message": "Feedback submitted successfully"}

@app.get("/analytics")
def get_analytics():
    feedbacks = list(collection.find({}, {"_id": 0}))
    
    total = len(feedbacks)
    avg_rating = sum(f["rating"] for f in feedbacks)/total if total else 0
    
    sentiments = {"Positive":0, "Neutral":0, "Negative":0}
    texts = []

    for f in feedbacks:
        sentiments[f["sentiment"]] += 1
        texts.append(f["feedback"])

    keywords = extract_keywords(texts)

    return {
        "total_feedback": total,
        "average_rating": round(avg_rating,2),
        "sentiments": sentiments,
        "keywords": keywords,
        "data": feedbacks
    }

@app.get("/export")
def export_report():
    feedbacks = list(collection.find({}, {"_id": 0}))
    path = generate_csv(feedbacks)
    return {"file": path}
