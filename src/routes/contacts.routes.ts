import { Router } from "express"

/* Controllers */
import { createContactController, deleteContactController, getContactsController, updateContactController } from "../controllers/contacts.controller.js"

/* Middleware */
import { verifyToken } from "../middlewares/auth.middleware.js"


const router = Router()


// /api/contact

// GET
/* 

  GET /api/contact/search?q=juan
  __________________________________________________
  | parameter | description                         |
  | --------- | ----------------------------------- |
  | "contact" |  Find user by (name or phone)       |
  |_________________________________________________|

*/
router.get("/", verifyToken, getContactsController)


// POST
router.post("/", verifyToken, createContactController)


// PATCH
router.patch("/:contact_id", verifyToken, updateContactController)


// DELETE
router.delete("/:contact_id", verifyToken, deleteContactController)


export default router