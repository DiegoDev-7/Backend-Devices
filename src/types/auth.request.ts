import { type Request } from "express"



/* Authenticated Request to delete account by google */
export interface AuthenticatedRequest extends Request {
  user?: {
    user_id: number
    email: string
    name?: string
  }
}