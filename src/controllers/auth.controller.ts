import { type Request, type Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

/* Services */
import { createUserService, getUserByEmailService, googleDeleteService, googleLoginService, googleRegisterService } from "../services/auth.service.js"
import { sendWelcomeEmailService, sendDeleteAccountService } from "../services/email.service.js"

/* Types */
import type { AuthenticatedRequest } from "../types/auth.request.js"



// Register user JWT
export const registerController = async (req: Request, res: Response) => {
  try {

    const { name, lastName, email, password } = req.body

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({
        message: "name, lastName, email, phone and password required"
      })
    }
    
    const user = await createUserService(name, lastName, email, password)

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    )

    // Send email to user
    sendWelcomeEmailService(email, name)
      .catch(err => console.error("Email error:", err))

    res.status(201).json({
      message: "Create user",
      token
    })

  } catch (error: any) {

    if (error.message === "EMAIL_EXISTS") {
      return res.status(409).json({
        message: "Email already exists"
      })
    }

    if (error.message === "PHONE_GENERATION_FAILED") {
      return res.status(500).json({
        error: "Error generathing number phone"
      })
    }

    return res.status(500).json({
      error: "Error in register user"
    })

  }
}



// Login user JWT
export const loginController = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: "Email and password required" })

    const user = await getUserByEmailService(email)

    if (!user) return res.status(401).json({message: "User not found"})
    

    // Validate password with user
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) return res.status(401).json({error: "Password is wrong"})

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    )

    res.json({ token })
    
  } catch (error: any) {
    
    res.status(500).json({
      error: "Login error"
    })

  }
}



// Register google
export const googleRegisterController = async (req: Request, res: Response) => {
  try {

    const { name, lastName, email, provider_id, avatar } = req.body

    const user: any = await googleRegisterService(
      name,
      lastName,
      email,
      provider_id,
      avatar
    )

    if (!user.isNew) {
      return res.status(200).json({
        message: "User already exists",
        isNew: false
      })
    }

    const token = jwt.sign(
      { user_id: user.user.user_id, email: user.user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    )

    // Send email to user
    sendWelcomeEmailService(email, name)

    res.status(201).json({ 
      token, 
      isNew: true 
    })
    
  } catch (error: any) {
    
    res.status(500).json({
      error: "Error registering Google user"
    })

  }
}



// Login google
export const googleLoginController = async (req: Request, res: Response) => {
  try {

    const { name, email, provider_id } = req.body

    const user = await googleLoginService(
      name,
      email,
      provider_id
    )

    if (!user) return res.status(401).json({message: "Name and email are required"})

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    )

    res.json({ token })
    
  } catch (error: any) {
    
    res.status(500).json({
      error: "User not found"
    })

  }
}



// Delete google account for nexia
export const googleDeleteController = async (req: AuthenticatedRequest, res: Response) => {

  try {

    const user = req.user as any

    if (!user?.user_id) return res.status(401).json({ error: "Unauthorized" })

    const { user_id, name, email } = user

    const deleteUser = await googleDeleteService(user_id)

    if (!deleteUser) return res.status(404).json({ error: "User not found" })

    res.json({
      message: "User deleted successfully",
      deleteUser
    })

    sendDeleteAccountService(email, name)
    
  } catch (error: any) {
    
    res.status(500).json({
      error: error.message
    })

  }

}