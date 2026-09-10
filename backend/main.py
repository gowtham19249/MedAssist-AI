from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from auth import get_password_hash, verify_password, create_access_token

app = FastAPI(
    title="MedAssist AI",
    description="Medical Symptom Analysis & Disease Prediction System",
    version="1.0.0"
)

# Mock Database for Week 1 (We will move this to PostgreSQL later)
fake_users_db = {}

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "patient" # Or "admin"

class UserLogin(BaseModel):
    email: str
    password: str

@app.get("/")
def root():
    return {"message": "MedAssist AI API is running"}

@app.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate):
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    
    fake_users_db[user.email] = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed_password,
        "role": user.role
    }
    
    return {"message": f"User {user.name} registered successfully as {user.role}"}

@app.post("/login")
def login_user(user: UserLogin):
    db_user = fake_users_db.get(user.email)
    
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user.email, "role": db_user["role"]})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_details": {
            "name": db_user["name"],
            "email": db_user["email"],
            "role": db_user["role"]
        }
    }
