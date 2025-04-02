import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { customizeErrorMessage, errorHandler } from "./utils/errorHandler";
import { weatherCodes } from "./utils/weatherCodes";
import { locationValidation } from "./validations/queryValidation";

const URL = process.env.WEATHER_API_URL;

const getWeather = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.query: ", req.query);
  try {
    await Promise.all(
      locationValidation.map((validation) => validation.run(req))
    );

    customizeErrorMessage(req, 'Example: "/weather?lat=54.123&lon=25.123"');

    const { lat, lon } = req.query;

    const apiResponse = await axios.get(
      `${URL}latitude=${lat}&longitude=${lon}` +
        `&current_weather=true&hourly=temperature_2m,weathercode`
    );

    const jsonResponse = apiResponse.data;

    let responseObject: any = {};
    if (jsonResponse?.current_weather) {
      const { current_weather } = jsonResponse;
      const weatherText = weatherCodes.get(current_weather.weathercode);
      responseObject = { ...current_weather, weatherText };
    }
    res.send(responseObject);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export default getWeather;
