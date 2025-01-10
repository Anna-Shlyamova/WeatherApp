import axios from "axios"

const http = axios.create({
  baseURL: "https://geocode-maps.yandex.ru",
})

const key = "c90e25ff-17ad-4ac1-bb70-685a54768ba8"
export const getLocation = (coords?: string): Promise<string> => {
  return http
    .get("1.x", {
      params: {
        apikey: key,
        geocode: coords,
        lang: "ru_RU",
        sco: "longlat",
        kind: "locality",
        format: "json",
        results: 1,
      },
    })
    .then(
      (value) =>
        value.data.response.GeoObjectCollection.featureMember[0].GeoObject.name
    )
}
