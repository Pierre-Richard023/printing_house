import axios from "axios"
import {
    OPTIONS_URL
} from "../config/config"

export const getAllOptions= () => {
    return axios.get(OPTIONS_URL)
        .then(response => response.data)
}

export const getOption = (id) => {
    return axios.get(OPTIONS_URL + "/" + id)
        .then(response => response.data)
}