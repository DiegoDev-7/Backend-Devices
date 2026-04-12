/* Services */
import { createContactService, deleteContactService, listContactsService, updateContactService } from "../services/contacts.service.js"



/* Get contacts */
export const getContactsController = async (req: any, res: any) => {
  try {
    
    const user_id = Number(req.user.user_id)
    const { search } = req.query

    const data = await listContactsService(user_id, search as string)

    res.json(data)
    
  } catch (err: any) {
    
    res.status(400).json({ error: err.message })
    
  }
}




/* Create contact */
export const createContactController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)
    const { phone, name_contact } = req.body

    const data = await createContactService(user_id, phone, name_contact)

    res.json(data.rows[0])

  } catch (err: any) {

    res.status(400).json({ error: err.message })

  }
}



/* Update contact */
export const updateContactController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)
    const contact_id = Number(req.params.contact_id)
    const { name_contact } = req.body

    if (!name_contact || typeof name_contact !== "string" || name_contact.trim() === "") {
      return res.status(400).json({ 
        error: "Name contact is required" 
      })
    }

    const updatedContact = await updateContactService(
      user_id,
      contact_id,
      name_contact
    )

    res.json({
      message: "Contact updated",
      contact: updatedContact
    })

  } catch (err: any) {

    if (err.message === "Contact not found") {
      return res.status(404).json({ error: err.message });
    }

    res.status(400).json({ error: err.message })

  }
}



/* Delete contact */
export const deleteContactController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)
    const { contact_id } = req.params

    await deleteContactService(Number(contact_id), user_id)

    res.json({ success: true })

  } catch (err: any) {

    res.status(400).json({ error: err.message })

  }
}