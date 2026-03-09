import jwt from "jsonwebtoken"



// Verify token
export const verifyToken = (
  req: any,
  res: any,
  next: any
) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: "Token is required"
    })
  }

  const token: any = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )

    req.user = decoded
    
    next()
  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    })
  }
}