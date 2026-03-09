/* Services */
import { getRadioColombiaService, getRadioEEUUService, getRadioJapanService } from "../services/radio.service.js"



// Get radio from colombia
export const getRadioColombiaController = async (req: any, res: any) => {
  try {

    const radio = await getRadioColombiaService()

    res.json(radio)

  } catch (error) {

    res.status(500).json({
      error: "Couldn't get a radio station from Colombia"
    })

  }
}



// Get radio from United States
export const getRadioEEUUController = async (req: any, res: any) => {
  try {

    const radio = await getRadioEEUUService()

    res.json(radio)

  } catch (error) {

    res.status(500).json({
      error: "Couldn't get a radio station from Colombia"
    })

  }
}



// Get radio from Japan
export const getRadioJapanController = async (req: any, res: any) => {
  try {

    const radio = await getRadioJapanService()

    res.json(radio)

  } catch (error) {

    res.status(500).json({
      error: "Couldn't get a radio station from Colombia"
    })

  }
}