from fastapi import APIRouter, Depends, HTTPException
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
