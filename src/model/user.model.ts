import pool from "../config/database.js"



// Get user by id
export const getUserByIdModel = async (
  user_id: number
) => {
  const result = await pool.query(
    `
      SELECT user_id, name, lastName, email, phone, avatar, provider, created_at 
      FROM users 
      WHERE user_id = $1
    `,
    [user_id]
  )

  return result.rows[0]
}



// DELETE user by ids
export const deleteUserByIdModel = async (
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



// Update user
export const updateUserModel = async (
  user_id: number,
  name: string,
  lastName: string,
  password: string | null,
  avatar: string
) => {
  
  const result = await pool.query(
    `
      UPDATE users
      SET
        name = COALESCE($1, name),
        lastName = COALESCE($2, lastName),
        password = COALESCE($3, password),
        avatar = COALESCE($4, avatar)
      WHERE user_id = $5
      RETURNING user_id, name, lastName, email, avatar
    `,
    [name, lastName, password, avatar, user_id]
  )

  return result.rows[0]

}



// Update avatar from user
export const updateAvatarModel = async (
  user_id: number,
  avatar: string
) => {

  await pool.query(
    `
      UPDATE users
      SET avatar = $1
      WHERE user_id = $2
    `,
    [avatar, user_id]
  )

}



// Create forgotten password code
export const createResetCodeModel = async (
  reset_code: string,
  reset_code_expiration: Date,
  email: string
) => {
  
  await pool.query(
    `
      UPDATE users SET reset_code = $1, reset_code_expiration = $2
      WHERE email = $3
    `,
    [reset_code, reset_code_expiration, email]
  )
  
}

// Verify code
export const verifyCodeModel = async (
  email: string
) => {

  const result = await pool.query(
    `
      SELECT reset_code, reset_code_expiration
      FROM users
      WHERE email = $1
    `,
    [email]
  )

  return result.rows[0]

}

// Reset password
export const resetPasswordModel = async (
  password: string,
  email: string
) => {

  await pool.query(
    `
      UPDATE users 
      SET password = $1, reset_code = NULL, reset_code_expiration = NULL
      WHERE email = $2
    `,
    [password, email]
  )

}




// Get avatar
export const getAvatarModel = async (
  user_id: number
) => {

  const result = await pool.query(
    `
      SELECT avatar
      FROM users
      WHERE user_id = $1
    `,
    [user_id]
  )

  return result.rows[0]?.avatar
}