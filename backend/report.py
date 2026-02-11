import pandas as pd

def generate_csv(feedbacks):
    df = pd.DataFrame(feedbacks)
    file_path = "report.csv"
    df.to_csv(file_path, index=False)
    return file_path
