import axios from "axios"
import {
    CITY_URL
} from "../config/config"

export const getAllCities = () => {
    return axios.get(CITY_URL)
        .then(response => response.data)
}

export const getCity = (id) => {
    return axios.get(CITY_URL + "/" + id)
        .then(response => response.data)
}