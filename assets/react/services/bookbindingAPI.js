import axios from "axios"
import {
    BOOKBINDING_URL
} from "../utils/urls"

export const getAllBookbinding= () => {
    return axios.get(BOOKBINDING_URL)
        .then(response => response.data)
}
