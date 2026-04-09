import pool from "../config/database.js"



// Get bank by user
export const getBankModel = async (
  user_id: number,
) => {
  
  const result = await pool.query(
    `
      SELECT bank_id, user_id, card, balance 
      FROM bank
      WHERE user_id = $1
    `,
    [user_id]
  )

  return result.rows[0]

}



// Get number card
export const getCardNumberByUserId = async (
  user_id: number
) => {

  const result = await pool.query(
    `
      SELECT card FROM bank
      WHERE user_id = $1
    `,
    [user_id]
  )

  return result.rows[0]
}



// Create bank by user
export const createBankModel = async (
  user_id: number, 
  card: string
) => {

  const result = await pool.query(
    `
      INSERT INTO bank (user_id, card, balance)
      VALUES ($1, $2, 0)
      RETURNING bank_id, user_id, card, balance, created_at
    `,
    [user_id, card]
  )

  return result.rows[0]

}