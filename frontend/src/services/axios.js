import axios from "axios"

const instance = axios.create({
    baseURL: process.env.API_GATEWAY_PORT || 'http://localhost:8081/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'Access-Control-Allow-Origin' : '*',
        'Content-Type' : 'application/json;charset=utf-8'
    }
  });

export default  instance