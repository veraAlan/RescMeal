import { useEffect, useState } from 'react'
import { getAllBusiness } from './apiBusiness'

export interface Business {
   id?: number
   name?: string
   type?: string
   address?: string
   schedule?: string
   cvu?: string
   image?: string
   phone?: string
}

export default () => {
   const [businesses, setBusinesses] = useState<Business[]>([])
   const [loading, setLoading] = useState<boolean>(true)
   const [error, setError] = useState<string | null>(null)
   const [page, setPage] = useState<number>(0)

   useEffect(() => {
      const fetchBusinesses = async () => {
         try {
            const data = await getAllBusiness(page, 2) // Initial fetch with page 0 and size 10
            setBusinesses(data._embedded.businessList) // Assuming the API returns the 'content' of the page 
            setLoading(false)
         } catch (error) {
            setError('Failed to fetch businesses')
            setLoading(false)
         }
      }
      fetchBusinesses()
   }, [page])

   if (loading) {
      return <div>Loading...</div>
   }

   if (error) {
      return <div>{error}</div>
   }

   return (
      <div className="container mx-auto my-4 p-4 border rounded-2xl border-4 border">
         <button onClick={() => { setPage(page.valueOf() + 1) }}>Siguiente pagina</button>
         <h1>Business List</h1>
         <ul>
            {businesses.map((business) =>
               <li key={business.id} className='p-2'>
                  <h2>{business.name}</h2>
                  <p>{business.type}</p>
               </li>
            )}
         </ul>
      </div >
   )
}