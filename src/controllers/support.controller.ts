/* Services */
import { sendSupportService } from "../services/support.service.js"



// Send an email to technical support
export const sendSupportEmailController = async (req: any, res: any) => {
  try {

    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All input data is required"
      })
    }

    await sendSupportService(name, email, message)

    return res.json({
      success: true,
      message: "Message sent successfully"
    })

  } catch (error: any) {

    if (error.message === "Email send failed") {
      return res.status(500).json({
        error: "Error sending message"
      })
    }

    return res.status(500).json({
      error: "Server error"
    })

  }
}