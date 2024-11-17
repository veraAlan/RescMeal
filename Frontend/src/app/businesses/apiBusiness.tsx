import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

// Adjust the base URL as needed
export const getAllBusiness = async (page: number, size: number) => {
   const response = await axios.get(`${BASE_URL}/api/business`,
      {
         params: { page, size },
         headers: { 'Content-Type': 'application/json', },
         withCredentials: true
      });
   return response.data;
}