# Fintech / Game API Documentation

## Base Concepts

Conceptual Diagram

    Client
      |
      v
    app.ts (middlewares globales)
      |
      +--> /api/users ------> userRoutes ------> verifyToken? ----> userController ----> userService ----> userModel ----> database
      |
      +--> /api/auth ------- > authRoutes ------> authController ----> authService ----> authModel ----> database
      |
      +--> /api/bank ------- > bankRoutes ------> bankController ----> bankService ----> bankModel ----> database
      |
      +--> /api/transaction -> transactionRoutes -> transactionController -> transactionService -> transactionModel -> database
      |
      +--> /api/game ------- > gameRoutes ------> gameController ----> gameService ----> gameModel ----> database
      |
      +--> /api/radio ------ > radioRoutes ------> radioController ----> radioService ----> radio data (data/radio/*.ts)

Architecture used across the project:

    Routes → Controller → Service → Model → Database

Authentication is handled with **JWT** using the header:

    Authorization: Bearer TOKEN

------------------------------------------------------------------------

# Authentication

## Google Login

Creates the user if it does not exist and returns a JWT.


**Endpoint**

    POST /auth/google/register

**Body**

``` json
{
  "name": "Juan",
  "lastName": "Gabriel",
  "email": "juan@gmail.com",
  "provider_id": "google_user_id",
  "avatar": "google_avatar"
}
```

**Response**

``` json
{
  "user": {
    "user_id": ?,
    "email": "juan@gmail.com",
  },
  "token": "JWT_TOKEN"
}
```


**Endpoint**

    POST /auth/google/login

**Body**

``` json
{
  "name": "Juan",
  "email": "juan@gmail.com",
  "provider_id": "google_user_id"
}
```

**Response**

``` json
{
  "user": {
    "user_id": ?,
    "email": "juan@gmail.com",
    "provider": "google"
  },
  "token": "JWT_TOKEN"
}
```

------------------------------------------------------------------------

# User Management

## Upload Avatar (Cloudinary)

Uploads an image and saves the URL in the database.

**Endpoint**

    POST /users/avatar

**Headers**

    Authorization: Bearer TOKEN
    Content-Type: multipart/form-data

**Body**

    avatar: image file

**Response**

``` json
{
  "avatar": "https://res.cloudinary.com/.../avatars/image.png"
}
```

### Notes

If the user already has an avatar: 1. The previous image is removed from
Cloudinary. 2. The new one is uploaded. 3. The database is updated.

------------------------------------------------------------------------

## Update User

Allows updating:

-   name
-   lastName
-   password
-   avatar

**Endpoint**

    PUT /users/update

**Body**

``` json
{
  "name": "Juan",
  "lastName": "Perez",
  "password": "newPassword123",
  "avatar": "https://link-to-avatar"
}
```

**Response**

``` json
{
  "user_id": 5,
  "name": "Juan",
  "lastName": "Perez",
  "avatar": "cloudinary_url"
}
```

------------------------------------------------------------------------

## Update password

Update password from user with codes.

**Endpoints**

    POST /users/request-reset
    POST /users/verify-code
    POST /users/reset-password

**Process**
    1. Create code
    2. Verify code
    3. Change password

**Responses**

    Status code 200

    1. Create code:
``` json
{
  "message": "Code sent to email"
}
```
    2. Verify code:
``` json
{
  "message": "Valid code"
}
```
    3. Change password:
``` json
{
  "message": "Password updated successfully"
}
```

------------------------------------------------------------------------

## Delete Account

Deletes the user and related records.

**Endpoint**

    DELETE /users/delete-account

**Headers**

    Authorization: Bearer TOKEN

**Process** 1. Delete transactions 2. Delete ATM wallet 3. Delete bank
account 4. Delete user

**Response**

``` json
{
  "message": "Account deleted successfully"
}
```

------------------------------------------------------------------------

# Bank System

## Bank Table

    bank
    -------
    bank_id
    user_id
    card
    balance
    created_at

------------------------------------------------------------------------

## Bank create

Get bank amount

    GET /bank
    
``` json
{
  "message": "Bank data obtained",
  "bank"
}
```

------------------------------------------------------------------------

## Bank create

Create bank account

    POST /bank/create/bank

``` json
{
  "message": "Bank account created",
  "bank"
}
```

------------------------------------------------------------------------

## Bank Login

Login bank with the last 4 digits in the card

    POST /bank/verify-card-code

**Body**

``` json
{
  "last4": 4545
}
```

------------------------------------------------------------------------

# Transactions

## Transactions Table

    transactions
    -------------
    transaction_id
    user_id
    receiver_user_id
    amount
    type
    created_at

Types:

    bank
    atm
    user

------------------------------------------------------------------------

## Transaction History

Returns all transactions for the user.

**Endpoint**

    GET /transactions/history

Optional query parameters:

    ?page=1
    &limit=10
    &type=atm_transfer

Example:

    GET /transactions/history?page=1&limit=10

**Response**

``` json
[
  {
    "transaction_id": 30,
    "user_id": 5,
    "receiver_user_id": 8,
    "amount": 50,
    "type": "atm_transfer"
  }
]
```

------------------------------------------------------------------------

# ATM Wallet

Used to move money between bank and users.

Supported operations:

-   Bank → ATM
-   ATM → Bank
-   ATM → User (phone transfer)

------------------------------------------------------------------------

## Bank → ATM

    POST /atm/transaction/bank

**Body**

``` json
{
  "amount": 200
}
```

------------------------------------------------------------------------

## ATM → Bank

    POST /atm/transaction/atm

**Body**

``` json
{
  "amount": 100
}
```

------------------------------------------------------------------------

## ATM → User (Phone Transfer)

    POST /atm/transaction/user

**Body**

``` json
{
  "phone": "3001234567",
  "amount": 50
}
```

------------------------------------------------------------------------

# Game System

Users earn money by clicking.

The frontend accumulates clicks and sends them in batches.

## Click Reward

Adds random money to the bank balance.

Reward per click:

    1 - 100

**Endpoint**

    POST /game/click

**Body**

``` json
{
  "clicks": 25
}
```

**Response**

``` json
{
  "reward": 1248
}
```

Money is added directly to:

    bank.balance

Security rule:

    max clicks per request = 100

------------------------------------------------------------------------

# Timed Reward (10 Minutes)

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