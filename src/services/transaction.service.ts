import pool from "../config/database.js"

/* Model */
import { createTransactionModel, getTransactionModel } from "../model/transaction.model.js"



// Receipt from the transfer
export const getTransactionService = async (
  user_id: number,
  page: number,
  limit: number,
  type: string | null
) => {
  try {

    const offset = (page - 1) * limit

    const receipt = getTransactionModel(
      user_id, 
      limit, 
      offset, 
      type
    )

    if (!receipt) return null

    return receipt

  } catch (error: any) {
    
    if (error.code !== "23505") {
      throw error
    }

  }
}



// Bank --> ATM
export const bankToATMService = async (
  user_id: number,
  amount: number
) => {

  const client = await pool.connect()

  try {

    await client.query("BEGIN")

    const bank = await client.query(
      `SELECT balance FROM bank WHERE user_id = $1`,
      [user_id]
    )

    if (bank.rows[0].balance < amount) {
      throw new Error("Insufficient bank funds")
    }

    await client.query(
      `UPDATE bank SET balance = balance - $1 WHERE user_id = $2`,
      [amount, user_id]
    )

    await client.query(
      `UPDATE atm SET balance = balance + $1 WHERE user_id = $2`,
      [amount, user_id]
    )

    const transaction = await createTransactionModel(
      user_id,
      null,
      amount,
      "bank_to_atm"
    )

    await client.query("COMMIT")

    return transaction

  } catch (error) {

    await client.query("ROLLBACK")
    throw error

  } finally {

    client.release()

  }

}



// ATM --> Bank
export const atmToBankService = async (
  user_id: number,
  amount: number
) => {

  const client = await pool.connect()

  try {

    await client.query("BEGIN")

    const atm = await client.query(
      `SELECT balance FROM atm WHERE user_id = $1`,
      [user_id]
    )

    if (atm.rows[0].balance < amount) {
      throw new Error("Insufficient ATM funds")
    }

    await client.query(
      `UPDATE atm SET balance = balance - $1 WHERE user_id = $2`,
      [amount, user_id]
    )

    await client.query(
      `UPDATE bank SET balance = balance + $1 WHERE user_id = $2`,
      [amount, user_id]
    )

    const transaction = await createTransactionModel(
      user_id,
      null,
      amount,
      "atm_to_bank"
    )

    await client.query("COMMIT")

    return transaction

  } catch (error) {

    await client.query("ROLLBACK")
    throw error

  } finally {

    client.release()

  }

}



// ATM --> User phone
export const atmToUserService = async (
  user_id: number,
  phone: string,
  amount: number
) => {

  const client = await pool.connect()

  try {

    await client.query("BEGIN")

    const senderATM = await client.query(
      `SELECT balance FROM atm WHERE user_id = $1`,
      [user_id]
    )

    if (senderATM.rows[0].balance < amount) {
      throw new Error("Insufficient ATM funds")
    }

    const receiver = await client.query(
      `SELECT user_id FROM users WHERE phone = $1`,
      [phone]
    )

    if (!receiver.rows.length) {
      throw new Error("User not found")
    }

    const receiverId = receiver.rows[0].user_id

    await client.query(
      `UPDATE atm SET balance = balance - $1 WHERE user_id = $2`,
      [amount, user_id]
    )

    await client.query(
      `UPDATE atm SET balance = balance + $1 WHERE user_id = $2`,
      [amount, receiverId]
    )

    const transaction = await createTransactionModel(
      user_id,
      receiverId,
      amount,
      "atm_transfer"
    )

    await client.query("COMMIT")

    return transaction

  } catch (error) {

    await client.query("ROLLBACK")
    throw error

  } finally {

    client.release()

  }

}