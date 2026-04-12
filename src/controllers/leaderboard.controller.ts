/* Services */
import { fetchLeaderboard, fetchUserRank } from "../services/leaderboard.service.js"



/* Get leaderboard */
export const getLeaderboardController = async (req: any, res: any) => {
  try {

    const { metric, order = "DESC", page = "0" } = req.query

    const data = await fetchLeaderboard(
      metric as string,
      order as "ASC" | "DESC",
      Number(page)
    )

    res.json(data)

  } catch (err: any) {

    res.status(400).json({ error: err.message })

  }
}



/* Get rank by user */
export const getMyRankController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user?.user_id)
    const { metric, order = "DESC" } = req.query

    const rank = await fetchUserRank(
      user_id,
      metric as string,
      order as "ASC" | "DESC"
    )

    res.json(rank)

  } catch (err: any) {

    res.status(400).json({ error: err.message })
  }
}