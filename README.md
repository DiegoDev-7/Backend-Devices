# Fintech / NEXIA API Backend

A modern backend API combining fintech capabilities with gamification features. Users can manage finances, perform transfers, and earn rewards through interactive gameplay.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Configuration](#configuration)
- [Getting Started](#getting-started)

---

## Overview

This API provides a complete fintech and gamification platform with the following capabilities:

- JWT-based authentication with Google OAuth support
- Banking system with accounts and transactions
- ATM wallet for money transfers
- Gamification with click-based rewards and timed rewards
- Contact management system
- Global leaderboard with multiple metrics
- Avatar upload with Cloudinary storage
- Support ticket system
- Radio station API

---

## Architecture

### Request Flow

```
Client
  |
  v
app.ts (Global Middlewares)
  - JWT Authentication
  - File Upload (Multer)
  |
  ├─ /api/auth        ──> Routes ──> Controller ──> Service ──> Model ──> Database
  ├─ /api/users       ──> Routes ──> Controller ──> Service ──> Model ──> Database
  ├─ /api/bank        ──> Routes ──> Controller ──> Service ──> Model ──> Database
  ├─ /api/atm         ──> Routes ──> Controller ──> Service ──> Model ──> Database
  ├─ /api/transaction ──> Routes ──> Controller ──> Service ──> Model ──> Database
  ├─ /api/game        ──> Routes ──> Controller ──> Service ──> Model ──> Database
  ├─ /api/reward      ──> Routes ──> Controller ──> Service ──> Model ──> Database
  ├─ /api/leaderboard ──> Routes ──> Controller ──> Service ──> Model ──> Database
  ├─ /api/contact     ──> Routes ──> Controller ──> Service ──> Model ──> Database
  ├─ /api/radio       ──> Routes ──> Controller ──> Service (Static Data)
  └─ /api/support     ──> Routes ──> Controller ──> Service (Email)
```

### Architectural Pattern

```
Routes → Controller → Service → Model → Database
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript |
| Runtime | Node.js + Express |
| Database | SQL (PostgreSQL) |
| Authentication | JWT (JSON Web Tokens) |
| File Storage | Cloudinary |
| Email Service | SMTP / NodeMailer |

---

## Project Structure

```
Backend-Devices/
│
├── src/
│   ├── app.ts                    # Express application setup
│   ├── server.ts                 # Server entry point
│   │
│   ├── config/                   # Global configuration
│   │   ├── database.ts           # Database connection
│   │   └── cloudinary.ts         # Cloudinary configuration
│   │
│   ├── routes/                   # API route definitions
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── bank.routes.ts
│   │   ├── transaction.routes.ts
│   │   ├── atm.routes.ts
│   │   ├── game.routes.ts
│   │   ├── leaderboard.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── radio.routes.ts
│   │   └── support.routes.ts
│   │
│   ├── controllers/              # Request handling logic
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── bank.controller.ts
│   │   ├── transaction.controller.ts
│   │   ├── atm.controller.ts
│   │   ├── game.controller.ts
│   │   ├── leaderboard.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── radio.controller.ts
│   │   └── support.controller.ts
│   │
│   ├── services/                 # Business logic
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── bank.service.ts
│   │   ├── transaction.service.ts
│   │   ├── atm.service.ts
│   │   ├── game.service.ts
│   │   ├── leaderboard.service.ts
│   │   ├── contact.service.ts
│   │   ├── email.service.ts
│   │   ├── radio.service.ts
│   │   └── support.service.ts
│   │
│   ├── model/                    # Database models (queries)
│   │   ├── auth.model.ts
│   │   ├── user.model.ts
│   │   ├── bank.model.ts
│   │   ├── transaction.model.ts
│   │   ├── atm.model.ts
│   │   ├── game.model.ts
│   │   ├── leaderboard.model.ts
│   │   └── contact.model.ts
│   │
│   ├── middlewares/              # Custom middlewares
│   │   ├── auth.middleware.ts    # JWT verification
│   │   └── upload.middleware.ts  # File upload handling
│   │
│   ├── types/                    # TypeScript interfaces
│   │   └── auth.request.ts
│   │
│   ├── data/                     # Static data
│   │   └── radio/
│   │       ├── radio.colombia.ts
│   │       ├── radio.eeuu.ts
│   │       └── radio.japan.ts
│   │
│   └── utils/                    # Helper functions
│       ├── email.templates.ts
│       ├── email.utils.ts
│       └── upload.utils.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

### Directory Description

| Directory | Purpose |
|-----------|---------|
| routes | Defines endpoints and maps requests to controllers |
| controllers | Handles HTTP requests and response formatting |
| services | Contains complex business logic |
| model | Database access layer with SQL queries |
| middlewares | Processes requests before reaching controllers |
| types | TypeScript interfaces and type definitions |
| config | Global configurations and connections |
| utils | Reusable helper functions |
| data | Static data and seeds |

---

## Authentication

### JWT Mechanism

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

### Google OAuth

Automatic user creation on first login:

**Register/Login with Google**

```http
POST /api/auth/google/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Juan",
  "lastName": "Gabriel",
  "email": "juan@gmail.com",
  "provider_id": "google_user_id",
  "avatar": "https://..."
}
```

**Response:**
```json
{
  "user": {
    "user_id": 1,
    "email": "juan@gmail.com",
    "provider": "google"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## API Endpoints

### User Management (/api/users)

#### Get User Profile

```http
GET /api/users
Authorization: Bearer TOKEN
```

#### Update User Profile

```http
PUT /api/users/update
Authorization: Bearer TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Juan",
  "lastName": "Perez",
  "password": "newPassword123",
  "avatar": "https://link-to-avatar"
}
```

**Response:**
```json
{
  "user_id": 5,
  "name": "Juan",
  "lastName": "Perez",
  "avatar": "cloudinary_url"
}
```

#### Upload Avatar (Cloudinary)

```http
POST /api/users/avatar
Authorization: Bearer TOKEN
Content-Type: multipart/form-data
```

**Form Data:** `avatar: <image_file>`

**Response:**
```json
{
  "avatar": "https://res.cloudinary.com/.../avatars/avatar123.png"
}
```

**Note:** If the user already has an avatar, the previous image is deleted from Cloudinary, the new one is uploaded, and the database is updated.

#### Request Password Reset

**Step 1: Request Reset Code**

```http
POST /api/users/request-reset
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Code sent to email"
}
```

**Step 2: Verify Reset Code**

```http
POST /api/users/verify-code
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**Response:**
```json
{
  "message": "Valid code"
}
```

**Step 3: Reset Password**

```http
POST /api/users/reset-password
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "123456",
  "newPassword": "newPassword123"
}
```

**Response:**
```json
{
  "message": "Password updated successfully"
}
```

#### Delete Account

```http
DELETE /api/users/delete-account
Authorization: Bearer TOKEN
```

**Process:**
1. Delete all transactions
2. Delete ATM wallet
3. Delete bank account
4. Delete user record

**Response:**
```json
{
  "message": "Account deleted successfully"
}
```

---

### Banking System (/api/bank)

#### Get Bank Account

```http
GET /api/bank
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "message": "Bank data obtained",
  "bank": {
    "bank_id": 1,
    "user_id": 5,
    "card": "****5678",
    "balance": 15000,
    "created_at": "2026-01-01T10:00:00Z"
  }
}
```

#### Create Bank Account

```http
POST /api/bank/create/bank
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "message": "Bank account created",
  "bank": {
    "bank_id": 1,
    "user_id": 5,
    "card": "****5678",
    "balance": 0
  }
}
```

#### Verify Card

Verify bank card using last 4 digits.

```http
POST /api/bank/verify-card-code
Content-Type: application/json
```

**Request Body:**
```json
{
  "last4": 5678
}
```

---

### ATM Wallet (/api/atm)

The ATM wallet enables money transfers between bank account, ATM wallet, and other users.

#### Transfer: Bank to ATM

```http
POST /api/atm/transaction/bank
Authorization: Bearer TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "amount": 200
}
```

#### Transfer: ATM to Bank

```http
POST /api/atm/transaction/atm
Authorization: Bearer TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "amount": 100
}
```

#### Transfer: ATM to User (Phone Transfer)

```http
POST /api/atm/transaction/user
Authorization: Bearer TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "phone": "3001234567",
  "amount": 50
}
```

---

### Gamification System

#### Click Reward

Users earn money by accumulating clicks. Frontend batches clicks and sends them.

```http
POST /api/game/click
Authorization: Bearer TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "clicks": 25
}
```

**Response:**
```json
{
  "reward": 1248
}
```

**Details:**
- Reward per click: 1 - 100
- Maximum clicks per request: 100
- Money is added directly to bank balance

#### Timed Reward (10-minute interval)

Users can claim a reward every 10 minutes.

```http
POST /api/reward/claim
Authorization: Bearer TOKEN
```

**Response (Success):**
```json
{
  "reward": 3487
}
```

**Response (Not Ready):**
```json
{
  "message": "Wait 420 seconds to claim reward"
}
```

**Details:**
- Reward range: 1000 - 5000
- Database field: `users.last_reward`

---

### Transactions (/api/transaction)

#### Get Transaction History

```http
GET /api/transaction/history?page=1&limit=10&type=atm_transfer
Authorization: Bearer TOKEN
```

**Query Parameters (Optional):**
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 10)
- `type` - Filter by type: `bank`, `atm`, `user`

**Response:**
```json
[
  {
    "transaction_id": 30,
    "user_id": 5,
    "receiver_user_id": 8,
    "amount": 50,
    "type": "atm_transfer",
    "created_at": "2026-01-15T10:30:00Z"
  }
]
```

**Transaction Types:**
- `bank` - Bank transfer
- `atm` - ATM transfer
- `user` - User-to-user transfer

---

### Leaderboard (/api/leaderboard)

Users can claim a reward every **10 minutes**.

Reward range:

    1000 - 5000

**Endpoint**

    POST /reward/claim

**Headers**

    Authorization: Bearer TOKEN

**Response**

``` json
{
  "reward": 3487
}
```

If the user tries too early:

``` json
{
  "message": "Wait 420 seconds to claim reward"
}
```

Database field used:

    users.last_reward

------------------------------------------------------------------------

# Support

    POST /support

``` json
{
  "message": "Message sent successfully",
  "emailSent"
}
```

------------------------------------------------------------------------

# Cloudinary Image Handling

Images are stored in folders:

    avatars/
    products/

Example URL:

    https://res.cloudinary.com/.../image/upload/v123/avatars/avatar123.png

Public ID extracted:

    avatars/avatar123

Used for deletion:

    cloudinary.uploader.destroy(public_id)

------------------------------------------------------------------------

# Radio API

Returns a list of radio stations from **Colombia**, **United States** and **Japan**,.

Base endpoint:

    /api/radio

Radio from Colombia:

    GET /api/radio/colombia

Radio from United States:

    GET /api/radio/eeuu

Radio from Japan:

    GET /api/radio/japan

------------------------------------------------------------------------

# Leaderboard System

Provides ranked views of users based on different metrics.

## Supported metrics:

    - bank_balance

    - atm_balance

    - total_balance

    - total_transactions

    - total_contacts

All rankings are paginated in chunks of 50.


### Get Leaderboard

    Returns ranked users ordered by a selected metric.

### Endpoint

    GET /api/leaderboard

### Query Params

    ?metric=total_transactions
    
    order=DESC
    
    page=0

### Response

``` json
{
    "user_id": 1,
    "name": "Diego",
    "lastname": "Rojas",
    "bank_balance": 10000,
    "atm_balance": 5000,
    "total_balance": 15000,
    "total_transactions": 320,
    "total_contacts": 45
}
```


## Get My Rank

    Returns the authenticated user’s position in a given metric.

### Endpoint

    GET /leaderboard/me/rank

### Query Params

    metric=total_transactions
    order=DESC

### Headers

    Authorization: Bearer TOKEN

### Response


``` json
{
  "rank": 342
}
```

## Get My Leaderboard Context

    Returns users around the authenticated user in the ranking.

### Endpoint

    GET /leaderboard/me/context

### Query Params

    metric=total_transactions

### Headers

    Authorization: Bearer TOKEN

### Response


``` json
{
  "rank": 342,
  "data": [
    {
      "user_id": 10,
      "name": "User A",
      "total_transactions": 120
    },
    {
      "user_id": 15,
      "name": "YOU",
      "total_transactions": 88
    },
    {
      "user_id": 18,
      "name": "User B",
      "total_transactions": 80
    }
  ]
}
```


------------------------------------------------------------------------

# Contacts

    Contacts System

Users can manage a personal contacts list linked to existing system users.

A contact can only be created if the phone number exists in the users table.

Each contact requires a custom display name (name_contact).


## List Contacts Endpoint

Returns all contacts of the authenticated user, with optional search by name or phone.

    GET /api/contact

### Query Params (optional)

    /api/contact?search=string

### Headers

    Authorization: Bearer TOKEN


``` json
{
    "contact_id": 1,
    "phone": "3123456789",
    "name_contact": "Juan Oficina",
    "created_at": "2026-04-11T10:00:00Z"
}
```


## Create Contact

Adds a new contact linked to an existing user by phone.

### Endpoint

    POST /contact

### Headers

    Authorization: Bearer TOKEN

``` json
{
  "phone": "3123456789",
  "name_contact": "Juan Oficina"
}
```

### Rules

- name_contact is required

- phone must exist in users.phone

- duplicates per user are not allowed

``` json
{
  "contact_id": 1,
  "phone": "3123456789",
  "name_contact": "Juan Oficina",
  "created_at": "2026-04-11T10:00:00Z"
}
```

Error (user does not exist)

``` json
{
  "message": "User does not exist"
}
```

Error (missing name)

``` json
{
  "message": "Contact name is required"
}
```


## Update Contact Name

Updates only the custom contact name.

### Endpoint

    PATCH /api/contact

### Headers

    Authorization: Bearer TOKEN

``` json
{
  "name_contact": "Nuevo Nombre"
}
```

### Response

``` json
{
  "success": true
}
```

### Rules

Only name_contact can be updated
Contact must belong to authenticated user


#Delete Contact

Removes a contact from the user’s list.

### Endpoint

    DELETE /contact/:contact_id

### Headers

    Authorization: Bearer TOKEN

### Response

``` json
{
  "success": true
}
```


# Search Contacts

Alternative explicit search endpoint.

### Endpoint

    GET /contact/search?q=string

### Headers

    Authorization: Bearer TOKEN

### Response

``` json
{
    "contact_id": 1,
    "phone": "3123456789",
    "name_contact": "Juan Oficina"
}
```

------------------------------------------------------------------------

# Project Structure

    src
     ├ config
     ├ controllers
     ├ data
     ├ middleware
     ├ model
     ├ routes
     ├ services
     ├ types
     ├ utils
     ├ app.ts
     └ server.ts

------------------------------------------------------------------------

# Getting Started

## Prerequisites

- Node.js 14 or later
- npm or yarn
- PostgreSQL or MySQL database
- Cloudinary account
- Google OAuth credentials (if using Google Login)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Backend-Devices
```

2. Install dependencies:

```bash
npm install
```

3. Create or update your environment variables.

4. Start the development server:

```bash
npm run dev
```

5. Start the production server:

```bash
npm start
```

## Environment Variables

Create a `.env` file in the project root and configure the following values:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
PORT=5000
```

------------------------------------------------------------------------

# Summary

The API includes:

-   JWT Authentication
-   Google Login
-   Avatar Upload with Cloudinary
-   User Update
-   Account Deletion
-   Bank & ATM System
-   Phone Transfers
-   Contact system
-   Leaderboard system
-   Transaction History
-   Click Game Rewards
-   Timed Rewards
-   Radio Stations

This backend works as a **mini fintech + game reward system**.