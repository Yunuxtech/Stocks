import axios from "axios";

const TOKEN = "ccva2o2ad3iaeesdj0u0ccva2o2ad3iaeesdj0ug"
export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params:{
        token: TOKEN
    }
})