import pool from "../config/database.js"



// Get transactions
export const getTransactionModel = async (
  user_id: number,
  limit: number,
  offset: number,
  type: string | null
) => {
  let query = `
    SELECT *
    FROM transactions
    WHERE (user_id = $1 OR receiver_user_id = $1)
  `

  const values: any[] = [user_id]

  if (type) {
    query += ` AND type = $2`
    values.push(type)
  }

  query += `
    ORDER BY created_at DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `

  values.push(limit, offset)

  const result = await pool.query(query, values)

  return result.rows
}



// Create receiver of the transaction
export const createTransactionModel = async (
  user_id: number,
  receiver_user_id: number | null,
  amount: number,
  type: string
) => {
  const result = await pool.query(
    `
      INSERT INTO transactions
      (user_id, receiver_user_id, amount, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [user_id, receiver_user_id, amount, type]
  )
  
  return result.rows[0]
}