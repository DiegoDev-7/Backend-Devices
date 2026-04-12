/* Model */
import { createContactModel, deleteContactModel, findUserByPhoneModel, getContactsModel, updateContactModel } from "../model/contacts.model.js"



/* List contact */
export const listContactsService = async (user_id: number, search?: string) => {
  return await getContactsModel(user_id, search)
}



/* Create new contact (add) */
export const createContactService = async (
  user_id: number,
  phone: string,
  name_contact: string
) => {
  if (!name_contact) {
    throw new Error("Contact name is required")
  }

  const user = await findUserByPhoneModel(phone)

  if (!user) {
    throw new Error("User does not exist")
  }

  return await createContactModel(user_id, phone, name_contact)
}



/* Update contact */
export const updateContactService = async (
  user_id: number, 
  contact_id: number, 
  name_contact: string
) => {
  const result = await updateContactModel(user_id, contact_id, name_contact)

  if (!result) {
    throw new Error("Contact not found")
  }

  return result
}



/* Delete contact */
export const deleteContactService = async (
  contact_id: number,
  user_id: number
) => {
  const result = await deleteContactModel(contact_id, user_id)

  if (result.rowCount === 0) {
    throw new Error("Contact not found")
  }

  return true
}