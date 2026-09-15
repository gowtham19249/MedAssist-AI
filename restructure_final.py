import os
import shutil

base_dir = r'D:\MedAssist\MedAssist-AI'

# 1. Create __init__.py files
dirs = [
    'backend/app/database',
    'backend/app/auth',
    'backend/app/patients',
    'backend/app/symptoms'
]
for d in dirs:
    path = os.path.join(base_dir, d, '__init__.py')
    with open(path, 'w', encoding='utf-8') as f:
        pass

# 2. Rename jwt.py to security.py
old_jwt = os.path.join(base_dir, 'backend/app/auth/jwt.py')
new_sec = os.path.join(base_dir, 'backend/app/auth/security.py')
if os.path.exists(old_jwt):
    shutil.move(old_jwt, new_sec)

# Update imports for security.py
files_to_update = [
    'backend/app/auth/routes.py',
    'backend/app/patients/routes.py',
    'backend/app/symptoms/routes.py'
]
for f_path in files_to_update:
    full_path = os.path.join(base_dir, f_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace('app.auth.jwt', 'app.auth.security')
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)

# 3. auth/schemas.py
auth_schemas = '''from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "patient"

class UserLogin(BaseModel):
    email: str
    password: str
'''
with open(os.path.join(base_dir, 'backend/app/auth/schemas.py'), 'w', encoding='utf-8') as f:
    f.write(auth_schemas)

# Update auth/routes.py
auth_routes = '''from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.database.models import User
from app.auth.security import get_password_hash, verify_password, create_access_token
from app.auth.schemas import UserCreate, UserLogin

router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(name=user.name, email=user.email, password=hashed_password, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": f"User {new_user.name} registered successfully!"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": db_user.email, "role": db_user.role})
    return {"access_token": access_token, "token_type": "bearer"}
'''
with open(os.path.join(base_dir, 'backend/app/auth/routes.py'), 'w', encoding='utf-8') as f:
    f.write(auth_routes)

# 4. patients/schemas.py
patient_schemas = '''from pydantic import BaseModel

class ProfileCreate(BaseModel):
    age: int
    gender: str
    blood_pressure: str
    cholesterol: str
'''
with open(os.path.join(base_dir, 'backend/app/patients/schemas.py'), 'w', encoding='utf-8') as f:
    f.write(patient_schemas)

# Update patients/routes.py
patient_routes = '''from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.database.models import PatientProfile, User
from app.auth.security import get_current_user
from app.patients.schemas import ProfileCreate

router = APIRouter()

@router.post("/profile")
def create_profile(profile: ProfileCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_profile = PatientProfile(
        user_id=current_user.id,
        age=profile.age,
        gender=profile.gender,
        blood_pressure=profile.blood_pressure,
        cholesterol=profile.cholesterol
    )
    db.add(new_profile)
    db.commit()
    return {"message": "Patient profile saved successfully!"}
'''
with open(os.path.join(base_dir, 'backend/app/patients/routes.py'), 'w', encoding='utf-8') as f:
    f.write(patient_routes)

# 5. symptoms/schemas.py
symptom_schemas = '''from pydantic import BaseModel

class SymptomsCreate(BaseModel):
    fever: bool
    cough: bool
    fatigue: bool
    difficulty_breathing: bool
'''
with open(os.path.join(base_dir, 'backend/app/symptoms/schemas.py'), 'w', encoding='utf-8') as f:
    f.write(symptom_schemas)

# Update symptoms/routes.py
symptom_routes = '''from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.database.models import SymptomRecord, User, PatientProfile
from app.auth.security import get_current_user
from app.symptoms.schemas import SymptomsCreate

router = APIRouter()

@router.post("/")
def submit_symptoms(symptoms: SymptomsCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    patient_profile = db.query(PatientProfile).filter(PatientProfile.user_id == current_user.id).first()
    
    if not patient_profile:
        raise HTTPException(status_code=400, detail="Please create a Patient Profile first.")
        
    new_symptoms = SymptomRecord(
        patient_id=patient_profile.id,
        fever=symptoms.fever,
        cough=symptoms.cough,
        fatigue=symptoms.fatigue,
        difficulty_breathing=symptoms.difficulty_breathing
    )
    db.add(new_symptoms)
    db.commit()
    return {"message": "Symptoms securely logged for AI analysis!"}
'''
with open(os.path.join(base_dir, 'backend/app/symptoms/routes.py'), 'w', encoding='utf-8') as f:
    f.write(symptom_routes)

# 6. ML folder restructuring
ml_dir = os.path.join(base_dir, 'ml', 'preprocessing')
old_inspect = os.path.join(ml_dir, 'inspect_dataset.py')
load_ds = os.path.join(ml_dir, 'load_datasets.py')
preprocess = os.path.join(ml_dir, 'preprocess.py')

if os.path.exists(old_inspect):
    shutil.move(old_inspect, load_ds)
with open(preprocess, 'w', encoding='utf-8') as f:
    f.write('# Placeholder for Milestone 2 preprocessing pipeline\n')

print('Final master blueprint restructuring complete!')
