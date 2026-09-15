from pydantic import BaseModel

class SymptomsCreate(BaseModel):
    fever: bool
    cough: bool
    fatigue: bool
    difficulty_breathing: bool
