/* Model */
import pool from "../config/database.js"



/* Get leaderboard */
export const getLeaderboard = async (
  metric: string,
  order: "ASC" | "DESC",
  limit: number,
  offset: number
) => {

  const allowedMetrics = [
    "bank_balance",
    "atm_balance",
    "total_balance",
    "total_transactions",
    "total_contacts"
  ]

  if (!allowedMetrics.includes(metric)) {
    throw new Error("Invalid metric")
  }

  const query = `
    SELECT
      user_id,
      name,
      lastname,
      avatar,
      bank_balance,
      atm_balance,
      total_balance,
      total_transactions,
      total_contacts
    FROM leaderboard
    ORDER BY ${metric} ${order}
    LIMIT $1 OFFSET $2
  `

  const result = await pool.query(query, [limit, offset])

  return result.rows

}



/* Get rank user */
export const getUserRank = async (
  user_id: number,
  metric: string,
  order: "ASC" | "DESC"
) => {
  const allowedMetrics = [
    "bank_balance",
    "atm_balance",
    "total_balance",
    "total_transactions",
    "total_contacts"
  ]

  if (!allowedMetrics.includes(metric)) {
    throw new Error("Invalid metric")
  }

  const direction = order === "DESC" ? ">" : "<"

  const query = `
    SELECT
      l.user_id,
      l.name,
      l.avatar,
      l.bank_balance,
      l.atm_balance,
      l.total_balance,
      l.total_transactions,
      l.total_contacts,
      (
        SELECT COUNT(*) + 1
        FROM leaderboard
        WHERE ${metric} ${direction} l.${metric}  
      ) AS rank
    FROM leaderboard l
    WHERE l.user_id = $1
  `

  const result = await pool.query(query, [user_id])
  return result.rows[0] || null
}