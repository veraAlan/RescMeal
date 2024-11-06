import axios from 'axios'
const SOAP_URL = 'http://localhost:8080/ws'

const createSoapRequest = (identifier: string, type: string, identifierType: string): string => {
   return `<?xml version="1.0" encoding="UTF-8"?>
   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://rescmeal.food/ws-rescmeal"> 
   <soapenv:Header/>
      <soapenv:Body>
         <ws:${type}>
            <${identifierType}>${identifier}</${identifierType}> 
         </ws:${type}>
      </soapenv:Body>
   </soapenv:Envelope>`
}

export const sendSoapRequest = async (identifier: string, type: string): Promise<string> => {
   let identifierType = "username"
   if (RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(identifier)) {
      identifierType = "email"
   }
   const soapRequest = createSoapRequest(identifier, type, identifierType)
   try {
      const response = await axios.post(SOAP_URL, soapRequest, { headers: { 'Content-Type': 'text/xml', } })
      return response.data.replaceAll('><', '>\n<').replaceAll(/(?=<\/\w+>)/g, '\n').replaceAll(/>(?=\w+)/g, '>\n\t')
   } catch (error) {
      console.error('SOAP Request Error:', error)
      return "No se pudo realizar la consulta."
   }
}