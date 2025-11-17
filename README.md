# Appointment Booking System

This is a **full-stack appointment booking system** built using:

- **Frontend:** React(Typescript) + Vite  
- **Backend:** Spring Boot + Java  
- **Database:** PostgreSQL  

The system allows Authorized users to view available branches , time slots, book appointments, and view bookings based on confirmation code.

---

## Prerequisites

Before running the app locally, make sure you have:

- **Node.js** (v18+ recommended) – [https://nodejs.org/](https://nodejs.org/)  
- **npm** (comes with Node.js)  
- **Java 17+** – [https://adoptium.net/](https://adoptium.net/)  
- **Maven** – [https://maven.apache.org/](https://maven.apache.org/)  
- **Docker & Docker Compose** (optional, for running full stack easily)  
- (Optional) **Postman** or **curl** to test API endpoints  

---

## Features

1. **Auth**  
   Users can register and login(JWT-based authentication) to use other endpoints.

2. **View Available Slots**  
   Users can see available appointment slots by branches.  

3. **Book Appointments**  
   Users can book appointments and receive confirmation.  

4. **Manage Appointments**  
   View existing bookings.  

---

### Clone the repository

```bash
#  Clone the repository
git clone https://github.com/Tyson2265/Apponintment-Booking-API


# Backend setup (USE Docker)
cd backend
docker-compose up --build

#  The API will be available at:

http://localhost:8080

PostgreSQL at localhost:5432
# Backend setup (without Docker)
cd backend
mvn clean install
mvn spring-boot:run

# Frontend setup (Run Local Development)

cd frontend
npm install
npm run dev

#  The frontend will be available at:

http://localhost:5173 or 5174 

## API Endpoints

### 1. Authorization


curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
        "username": "Tyson",
        "password": "password123",
      }'

curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
        "username": "Tyson",
        "password": "password123",
      }'

Response 

{
  "accessToken": "<JWT_TOKEN>",
  "tokenType": "Bearer"
}



### 2. Get All Branches

curl -X GET http://localhost:8080/api/branches \
  -H "Authorization: Bearer <JWT_TOKEN>"


### 2. Get Slots
curl -X GET "http://localhost:8080/api/slots?branchId=1&date=2025-11-18" \
  -H "Authorization: Bearer <JWT_TOKEN>"


### 3. Book an appointment
curl -X POST http://localhost:8080/api/appointments \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
        "slotId": 1,
        "customerName": "Tyson",
        "customerContact": "Tyson@example.com"
      }''

### 4. Get appointment based on confirmationCode 

curl -X POST http://localhost:8080/api/appointments/{confirmationCode} \
  -H "Authorization: Bearer <JWT_TOKEN>"

