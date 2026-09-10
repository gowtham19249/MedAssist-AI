import pandas as pd
import os

print("--- MedAssist AI Dataset Inspector ---\n")

datasets = {
    "Disease Prediction": "../../datasets/raw/disease_prediction.csv",
    "Disease Symptoms": "../../datasets/raw/disease_symptoms.csv",
    "CDC BRFSS": "../../datasets/raw/brfss.csv"
}

for name, path in datasets.items():
    print(f"Loading {name} Dataset...")
    if os.path.exists(path):
        df = pd.read_csv(path)
        print(f"Success! Shape: {df.shape[0]} rows, {df.shape[1]} columns")
        print(f"Columns: {list(df.columns)[:5]}...\n")
    else:
        print(f"File not found at {path}\n")
