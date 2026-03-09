/* Model */
import pool from "../config/database.js"



// Update the balance by user_id
export const addMoneyToBankModel = async (
  user_id: number,
  amount: number
) => {

  const result = await pool.query(
    `
      UPDATE bank
      SET balance = balance + $1
      WHERE user_id = $2
      RETURNING balance
    `,
    [amount, user_id]
  )

  return result.rows[0].balance
  
}



// Get reward with time
export const getLastRewardModel = async (
  user_id: number
) => {

  const result = await pool.query(
    `
      SELECT last_reward
      FROM bank
      WHERE user_id = $1
    `,
    [user_id]
  )

  return result.rows[0]?.last_reward

}



// Timer to claim the next reward
export const updateLastRewardModel = async (
  user_id: number
) => {

  await pool.query(
    `
      UPDATE bank
      SET last_reward = NOW()
      WHERE user_id = $1
    `,
    [user_id]
  )

}



// Add reward
export const addRewardToBankModel = async (
  user_id: number,
  amount: number
) => {

  await pool.query(
    `
      UPDATE bank
      SET balance = balance + $1
      WHERE user_id = $2
    `,
    [amount, user_id]
  )

}