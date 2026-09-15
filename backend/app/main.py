from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import routes as auth_routes
from app.patients import routes as patient_routes
from app.symptoms import routes as symptom_routes
from app.database.connection import engine
from app.database import models

# Create database tables automatically
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="MedAssist AI", version="1.0.0")

# Fix CORS so React can communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins (React on port 5173)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/api/auth", tags=["Auth"])
app.include_router(patient_routes.router, prefix="/api/patient", tags=["Patients"])
app.include_router(symptom_routes.router, prefix="/api/symptoms", tags=["Symptoms"])

@app.get("/")
def root():
    return {"message": "MedAssist AI Modular API is running"}
