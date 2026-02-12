from pymongo import MongoClient
from sentiment import analyze_sentiment
from datetime import datetime, timedelta
import random
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URL)
db = client["customer_feedback"]
collection = db["feedbacks"]

# Sample Data
dates = [datetime.now() - timedelta(days=i) for i in range(30)]
names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack"]
products = ["Analyzer Pro", "Feedback Tool", "Data Insights", "Customer Voice"]

feedbacks = [
    ("Great tool, very intuitive!", 5),
    ("Not bad, but could be faster.", 3),
    ("Terrible experience, crashed twice.", 1),
    ("Love the new features!", 5),
    ("Customer support was helpful.", 4),
    ("Missing some key integrations.", 3),
    ("Best analytics platform I've used.", 5),
    ("Confusing UI, needs work.", 2),
    ("Okay for the price.", 3),
    ("Excellent value for money.", 5),
    ("Documentation is sparse.", 2),
    ("Highly recommended!", 5),
    ("It's buggy on mobile.", 2),
    ("Decent, but competitors are better.", 3),
    ("Simple and effective.", 4),
    ("I encountered a login issue.", 2),
    ("Fantastic dashboard visualization.", 5),
    ("Slow loading times.", 2),
    ("Good, but expensive.", 3),
    ("Life saver for our team.", 5)
]

def seed_db():
    print("Seeding database...")
    # Clear existing data (optional, but good for testing)
    # collection.delete_many({}) 
    
    for _ in range(50): # Add 50 entries
        text, base_rating = random.choice(feedbacks)
        sentiment, score = analyze_sentiment(text)
        
        # Add some randomness to rating based on sentiment score
        rating = base_rating
        
        entry = {
            "name": random.choice(names),
            "product": random.choice(products),
            "rating": rating,
            "feedback": text,
            "sentiment": sentiment,
            "score": score,
            "date": random.choice(dates)
        }
        collection.insert_one(entry)
        
    print("Database seeded with 50 entries.")

if __name__ == "__main__":
    seed_db()
