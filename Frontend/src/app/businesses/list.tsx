import axios from 'axios'
import { useEffect, useState } from 'react'

export default () => {

   axios.get(`${process.env.NEXT_PUBLIC_API_URL}/business`, { withCredentials: true })
      .then(r => {
         console.log(r.data)
      })
      .catch(e => {
         console.log(e)
      })
   return (
      <div className="container mx-auto my-4 p-4 border rounded-2xl border-4 border">
      </div >
   );
};