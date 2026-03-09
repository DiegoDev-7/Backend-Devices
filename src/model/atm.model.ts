import pool from "../config/database.js"



// Create bank by user
export const getAtmModel = async (
  user_id: number, 
) => {

  const result = await pool.query(
    `
      SELECT atm_id, user_id, balance
      FROM atm
      WHERE user_id = $1
    `,
    [user_id]
  )

  return result.rows[0]

}



// Create atm by user
export const createATMModel = async (
  user_id: number
) => {

  const result = await pool.query(
    `
      INSERT INTO atm (user_id, balance)
      VALUES ($1, 0)
      RETURNING atm_id, user_id, balance
    `,
    [user_id]
  )

  return result.rows[0]
  
}