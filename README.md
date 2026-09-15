# MedAssist AI

Medical Symptom Analysis & Disease Prediction System

## Overview
MedAssist AI is an intelligent healthcare platform that allows patients to log their medical history and symptoms to receive preliminary disease predictions and risk assessments using machine learning.

## Problem Statement
Patients often lack immediate access to preliminary medical analysis based on their symptoms and health profiles.

## Objectives
- Build a secure, user-friendly patient dashboard.
- Provide symptom tracking and medical history logging.
- Integrate machine learning for disease prediction (Milestone 2).

## System Architecture
React
   ↓
FastAPI
   ↓
PostgreSQL
   ↓
ML/Data layer

## Technology Stack

**Current:**
React + Vite
FastAPI
PostgreSQL
Pandas
NumPy

**Planned:**
Scikit-learn
XGBoost
TensorFlow
Tailwind CSS
JWT
Chart.js
Docker
AWS/Azure

## Project Structure
Standard modular architecture separating frontend, backend, datasets, machine learning, and documentation.

## Milestones

### Milestone 1 Status
- [x] Define healthcare workflows
- [x] Design system architecture
- [x] Design database schema
- [x] Create UI wireframes
- [x] Setup frontend
- [x] Setup backend
- [x] Implement authentication
- [x] Implement RBAC
- [x] Integrate datasets
- [x] Implement symptom collection
- [x] Implement patient management
- [x] Build patient dashboard

### Milestone 2
Machine learning modeling and disease prediction.

### Milestone 3
Risk assessments, reporting, and visualizations.

### Milestone 4
Deployment and infrastructure.

## Datasets
- Disease Symptoms and Patient Profile Dataset
- Disease Prediction Using Symptoms Dataset
- CDC BRFSS Dataset

## Installation
Refer to documentation to set up the Python and Node environments.

## Running Backend
\\ash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
\
## Running Frontend
\\ash
cd frontend
npm run dev
\
## API Documentation
Once the backend is running, visit http://127.0.0.1:8000/docs to view the interactive FastAPI Swagger UI.

## Database
Uses PostgreSQL. Refer to backend/.env.example for the connection string format.

## Future Work
- Integration of predictive ML models.
- Advanced visualization of health trends.

## Medical Disclaimer
Medical Disclaimer: MedAssist AI is an educational/decision-support project and is not a substitute for professional medical diagnosis, treatment, or emergency medical care.
