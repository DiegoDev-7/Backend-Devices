import pool from "../config/database.js"



// Create user
export const createUserModel = async (
  name: string, 
  lastName: string,
  email: string, 
  phone: string, 
  hashedPassword: string
) => {
  const result = await pool.query(
    `
      INSERT INTO users (name, lastName, email, phone, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id, name, lastName, email, phone, created_at
    `,
    [name, lastName, email, phone, hashedPassword]
  )

  return result.rows[0]
}



// Get user by email
export const getUserByEmailModel = async (
  email: string
) => {
  const result = await pool.query(
    `
      SELECT * FROM users 
      WHERE email = $1
    `,
    [email]
  )

  return result.rows[0] || null
}



// Register user by google
export const createGoogleUserModel = async (
  name: string,
  lastName: string,
  email: string,
  phone: string,
  provider_id: string,
  avatar?: string
) => {
  
  const existingUser = await pool.query(
    `
      SELECT * FROM users 
      WHERE provider_id = $1
    `,
    [provider_id]
  )

  if (existingUser.rows.length > 0) {
    return {
      user: existingUser.rows[0],
      isNew: false
    }
  }

  const newUser = await pool.query(
    `
      INSERT INTO users
      (name, lastName, email, phone, avatar, provider, provider_id, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *
    `,
    [name, lastName, email, phone, avatar, "google", provider_id]
  )

  return {
    user: newUser.rows[0],
    isNew: true
  }

}



// Login user by google
export const loginGoogleUserModel = async (
  name: string,
  email: string,
  provider_id: string
) => {

  const result = await pool.query(
    `
      INSERT INTO users (name, email, provider, provider_id)
      VALUES ($1, $2, "google", $3)
      RETURNING *
    `,
    [name, email, provider_id]
  )

  if (result.rows.length === 0) {
    throw new Error("User not found")
  }

  return result.rows[0]

}



// Delete account by google
export const deleteGoogleUserModel = async (
  user_id: number
) => {

  await pool.query(
    `
      DELETE FROM transactions
      WHERE user_id = $1 OR receiver_user_id = $1
    `,
    [user_id]
  )

  await pool.query(
    `
      DELETE FROM atm 
      WHERE user_id = $1
    `,
    [user_id]
  )

  await pool.query(
    `
      DELETE FROM bank 
      WHERE user_id = $1
    `,
    [user_id]
  )
  
  const result = await pool.query(
    `
      DELETE FROM users
      WHERE user_id = $1 
      RETURNING *
    `,
    [user_id]
  )

  
  if (result.rows.length === 0) {
    throw new Error("User not found")
  }

  return result.rows[0]

}