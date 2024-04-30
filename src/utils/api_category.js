import axios from "axios"

const API_URL = "http://localhost:5000";

export const getCategory = async () => {
    try {
        const response = await axios.get(API_URL + "/category");
        return response.data
    } catch (error) {
        console.log(error)
    }
}