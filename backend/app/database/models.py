from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="patient")
    
    profile = relationship("PatientProfile", back_populates="user", uselist=False)

class PatientProfile(Base):
    __tablename__ = "patient_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    age = Column(Integer)
    gender = Column(String)
    blood_pressure = Column(String)
    cholesterol = Column(String)
    
    user = relationship("User", back_populates="profile")
    symptoms = relationship("SymptomRecord", back_populates="patient")

class SymptomRecord(Base):
    __tablename__ = "symptom_records"
    
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patient_profiles.id"))
    fever = Column(Boolean, default=False)
    cough = Column(Boolean, default=False)
    fatigue = Column(Boolean, default=False)
    difficulty_breathing = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    patient = relationship("PatientProfile", back_populates="symptoms")
