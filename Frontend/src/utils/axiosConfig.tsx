import axios from 'axios'

// Detect the environment
const isMobile = typeof window !== 'undefined' ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false

export default axios.create({
   baseURL: isMobile ? `${process.env.NEXT_PUBLIC_MOBILE_API_URL}` : `${process.env.NEXT_PUBLIC_API_URL}`,
   withCredentials: true
})