# Installation and Run Guide

This document outlines the steps to install and run the **frontend (Next.js)** and **backend (NestJS)** projects for the provided task.

---

## Prerequisites

Ensure the following tools are installed:
- **Node.js**: Version 16 or higher
- **npm** or **yarn**: Package manager
- **MongoDB**: Running locally or remotely
- **Git**: For cloning repositories

---

## Repositories

1. **Frontend**: [Frontend Repository](https://github.com/nabil-alsaadi/artemis-frontend)
2. **Backend**: [Backend Repository](https://github.com/nabil-alsaadi/artemis-backend)

---

## Setup and Run

### 1. Backend (NestJS)

#### Steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nabil-alsaadi/artemis-backend
   cd artemis-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root of the project with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/artemis
   PORT=4000
   
   ```

4. **Run the Application**:
   - **Development Mode**:
     ```bash
     npm run start:dev
     ```
   - **Production Mode**:
     ```bash
     npm run build
     npm run start:prod
     ```

5. **API Access**:
   The backend API will be accessible at `http://localhost:4000`.

      #### Key Endpoints:
      - `GET /blocks`: Fetch all blocks.
      - `POST /submissions`: Submit selected blocks.
      - `GET /blocks/generate`: generate dummy data for blocks.
6. **Generate Data**:
  you can generate data for new MongoDb to fill the dummy data in database
     - **Using postman**:
       `GET http://localhost:4000/blocks/generate` 
     - **using termenal**:
       ```bash
        curl --location 'http://localhost:4000/blocks/generate'
        ```
---

### 2. Frontend (Next.js)

#### Steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nabil-alsaadi/artemis-frontend
   cd artemis-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root of the project with the following variable:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   ```

4. **Run the Application**:
   - **Development Mode**:
     ```bash
     npm run dev
     ```
   - **Production Mode**:
     ```bash
     npm run build
     npm run start
     ```

5. **Access the Frontend**:
   Open your browser and navigate to `http://localhost:3000`.

---

## Application Functionality

### Frontend:
- Displays blocks fetched from the backend.
- Allows selection of:
  - **Single Blocks**: Only one block can be selected at a time.
  - **Grouped Blocks**: Multiple blocks can be selected.
- Submit button:
  - Disabled until at least one block is selected.
  - Validates block selection before submission.
- Sends selected blocks to the backend API.

### Backend:
- Handles API requests for fetching and submitting blocks.
- Validates block selection:
  - Ensures only one **single** block can be selected.
  - Prevents mixed selection of **single** and **grouped** blocks.
- Saves submitted data in MongoDB.

---

## Testing

### Backend:
1. Use **Postman** or **cURL** to test the APIs:
   - **Fetch Blocks**:
     ```http
     GET http://localhost:4000/blocks
     ```
   - **Submit Blocks**:
     ```http
     POST http://localhost:4000/submissions
     Content-Type: application/json

     {
       "blockIds": ["block1_id", "block2_id"]
     }
     ```

### Frontend:
1. Open the application at `http://localhost:3000`.
2. Select blocks and test the submission functionality.

---
