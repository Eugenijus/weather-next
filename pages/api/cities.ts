import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { customizeErrorMessage, errorHandler } from "./utils/errorHandler";
import { citiesValidation } from "./validations/queryValidation";

const GEO_API_URL = process.env.RAPID_API_GEO_API_URL;
const GEO_API_HOST = process.env.RAPID_API_GEO_API_HOST;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const geoApiOptions = {
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": GEO_API_HOST,
  },
};

const getCities = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await Promise.all(
      citiesValidation.map((validation) => validation.run(req))
    );

    customizeErrorMessage(
      req,
      'Example: "/cities?namePrefix=vilnius&minPopulation=10000"'
    );

    const namePrefix = req.query.namePrefix as string;
    const minPopulation =
      parseInt(req.query.minPopulation as string, 10) || 10000;

    const apiResponse = await axios.get(
      `${GEO_API_URL}/cities?namePrefix=${namePrefix}&minPopulation=${minPopulation}`,
      geoApiOptions
    );

    const jsonResponse = apiResponse.data;
    console.log("jsonResponse: ", jsonResponse);
    res.send(jsonResponse);
  } catch (error) {
    //res.status(500).json({ message: "Internal server error" });
    errorHandler(error, req, res);
  }
};

export default getCities;
