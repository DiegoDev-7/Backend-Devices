/* Models */
import { getLeaderboard, getUserRank } from "../model/leaderboard.model.js"



/* Get leaderboard */
export const fetchLeaderboard = async (
  metric: string,
  order: "ASC" | "DESC",
  page: number
) => {
  try {

    const limit = 50
    const offset = page * limit

    return await getLeaderboard(metric, order, limit, offset)
    
  } catch (error: any) {
    
    if (error.code !== "23505") {
      throw error
    }

  }
}



/* Get user rank */
export const fetchUserRank = async (
  user_id: number,
  metric: string,
  order: "ASC" | "DESC"
) => {
  try {

    return await getUserRank(user_id, metric, order)

  } catch (error: any) {

    if (error.code !== "23505") {
      throw error
    }
    
  }
}