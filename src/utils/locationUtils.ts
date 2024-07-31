import {getLocation} from "../api/geocodeApi/geocode.api";

export const getCurrentLocation = async (coords: string | undefined): Promise<string | undefined> => {
  try{
    return await getLocation(coords);
  }
  catch (err) {console.log(err)}
}