from collections import Counter
import re

def extract_keywords(texts):
    words = []

    for text in texts:
        clean = re.sub(r'[^a-zA-Z ]', '', text.lower())
        words.extend(clean.split())

    common = Counter(words).most_common(10)
    return common
