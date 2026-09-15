from fastapi import APIRouter, Depends
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
