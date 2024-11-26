import axiosConfig from '@/utils/axiosConfig'

// Adjust the base URL as needed
export const getAllBusiness = async (page: number, size: number) => {
   const response = await axiosConfig.get(`/api/business/list`,
      {
         params: { page, size }
      })
   return response.data
}