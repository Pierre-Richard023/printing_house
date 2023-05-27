import axios from "axios"
import {
    MAILTYPES_URL
} from "../utils/urls"

export const getAllMailTypes= () => {
    return axios.get(MAILTYPES_URL)
        .then(response => response.data)
}
