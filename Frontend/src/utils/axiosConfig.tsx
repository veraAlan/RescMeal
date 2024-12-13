import axios from 'axios'

// Detect the environment
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const instance = axios.create({
   baseURL: isMobile ? `${process.env.NEXT_PUBLIC_MOBILE_API_URL}` : `${process.env.NEXT_PUBLIC_API_URL}`,
   withCredentials: true
})

export default instance