import axios from "axios";
import {City} from "../../types/City.ts";

const http = axios.create({
  baseURL: 'http://htmlweb.ru/json/geo',
});

const apiKey = '575fdeee8668eaa2037b70dca7d11db9';

export const getCityList = ():  Promise<Array<City>> => {
  return http
    .get('city_list', { params: {
        country: 'ru',
        level: 2,
        api_key: apiKey,
        perpage: 99999,
      }
    })
    .then(value => value.data.items);
};