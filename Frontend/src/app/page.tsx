'use client'

import { useState, useEffect } from "react"

export default function Home() {
  const [carriers, setCarriers] = useState(null)

  useEffect(() => {
    async function fetchCarriers() {
      let res = await fetch("http://localhost:8080/api/carrier/list")
      let data = await res.json();
      console.log(data)
      setCarriers(data)
    }
    fetchCarriers()
  }, [])

    

  if (!carriers) return <div>Loading...</div>

  return (
    <div>
      <ul>
        {carriers.map((carrier) => (
          <li key={carrier.id}>{carrier.name} <br></br> {carrier.lastName}</li>
        ))}
      </ul>
    </div>
  )
}