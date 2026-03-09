// Get link id public in cloudinary
export const getPublicIdFromUrlUtils = (url: string) => {

  const parts: any = url.split("/")

  const folder: any = parts[parts.length - 2]

  const fileName: any = parts[parts.length - 1]

  const public_id: any = fileName.split(".")[0]

  return `${folder}/${public_id}`

}