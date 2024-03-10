import axios from 'axios'
const API_KEY = process.env.NYT_API_KEY;
const API_BASE_URL = 'https://api.nytimes.com/svc/topstories/v2';

export const fetchTravelStories = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/travel.json?api-key=${API_KEY}`)
        console.log("🚀 ~ fetchTravelStories ~ res:", res)
        return res.data
    } catch (error) {
        console.error(`Error: ${error}`)
        return null
    }
}