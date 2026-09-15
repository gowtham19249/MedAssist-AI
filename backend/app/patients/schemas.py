from pydantic import BaseModel

class ProfileCreate(BaseModel):
    age: int
    gender: str
    blood_pressure: str
    cholesterol: str
