import pool from "../config/database.js"



/* Find contact if exist */
export const findUserByPhoneModel = async (phone: string) => {
  const result = await pool.query(
    `
      SELECT user_id, phone, name, lastname 
      FROM users WHERE phone = $1
    `,
    [phone]
  )

  return result.rows[0]
}



/* Get contacts */
export const getContactsModel = async (user_id: number, search?: string) => {
  let query = `
    SELECT contact_id, phone, name_contact, created_at
    FROM contacts
    WHERE user_id = $1
  `

  const params: any[] = [user_id]

  if (search) {
    params.push(`%${search}%`)
    query += `
      AND (
        name_contact ILIKE $2
        OR phone ILIKE $2
      )
    `
  }

  query += " ORDER BY created_at DESC"

  return (await pool.query(query, params)).rows
}



/* Create contact */
export const createContactModel = async (
  user_id: number,
  phone: string,
  name_contact: string
) => {
  return await pool.query(
    `
    INSERT INTO contacts (user_id, phone, name_contact)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [user_id, phone, name_contact]
  )
}



/* Update contact */
export const updateContactModel = async (user_id: number, contact_id: number, name_contact: string) => {
  const result = await pool.query(`
    UPDATE contacts 
    SET name_contact = $1
    WHERE contact_id = $2 
      AND user_id = $3
    RETURNING *
    `,
    [name_contact, contact_id, user_id]
  )

  return result.rows[0]
}



/* Delete contact */
export const deleteContactModel = async (contact_id: number, user_id: number) => {
  return await pool.query(
    `
    DELETE FROM contacts
    WHERE contact_id = $1 AND user_id = $2
    RETURNING *
    `,
    [contact_id, user_id]
  )
}