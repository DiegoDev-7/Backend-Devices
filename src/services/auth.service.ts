import bcrypt from "bcrypt"

/* Model */
import { createUserModel, getUserByEmailModel, loginGoogleUserModel, createGoogleUserModel, deleteGoogleUserModel } from "../model/auth.model.js"



// Create new user
// Generate number phone random
const generatePhone = () => {
  const prefix = "3"
  const random = Math.floor(100000000 + Math.random() * 900000000)
  return prefix + random.toString().slice(1)
}
export const createUserService = async (
  name: string,
  lastName: string,
  email: string,
  password: string
) => {
  
  const hashedPassword = await bcrypt.hash(password, 10)

  let user
  let created = false 
  let attemps = 0
  const max_attemps = 5


  while (!created && attemps < max_attemps) {
    attemps++

    const phone = generatePhone()

    try {

      user = await createUserModel(
        name,
        lastName,
        email,
        phone,
        hashedPassword
      )

      created = true

    } catch (error: any) {

      if (error.code === "23505") {

        if (error.constraint === "users_email_key") {
          throw new Error("EMAIL_EXISTS")
        }

        if (error.constraint === "users_phone_key") {
          continue
        }

      }

      throw error
      
    }

  }

  if (!created) {
    throw new Error("PHONE_GENERATION_FAILED")
  }

  return user
  
}



// Search user for login with email
export const getUserByEmailService = async (email: string) => {
  try {

    let user = await getUserByEmailModel(email)

    if (!user) return null

    return user

  } catch (error: any) {

    if (error.code !== "23505") {
      throw error
    }

  }
}



// Register google
export const googleRegisterService = async (
  name: string,
  lastName: string,
  email: string,
  provider_id: string,
  avatar?: string
) => {

  let user 
  let created = false

  while (!created) {
    
    const phone = generatePhone()

    try {

      user = await createGoogleUserModel(
        name,
        lastName,
        email,
        phone,
        provider_id,
        avatar
      )

      created = true
      
    } catch (error: any) {

      if (error.code !== "23505") {
        throw error
      }
      
    }

  }

  return user

}



// Login google
export const googleLoginService = async (
  name: string,
  email: string,
  provider_id: string
) => {

  let user = await getUserByEmailModel(email)

  if (!user) {
    
    user = await loginGoogleUserModel(
      name,
      email,
      provider_id
    )

  }

  return user

}



// Delete google account in nexia
export const googleDeleteService = async (
  user_id: number
) => {

  if (!user_id) throw new Error("user_id is required")
  
  const deleteGoogle = await deleteGoogleUserModel(user_id)

  return deleteGoogle

}