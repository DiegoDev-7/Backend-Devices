import multer from "multer"

const storage = multer.memoryStorage()

const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp"
]

export const upload: any = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Only images allowed"))
    }

  }
})