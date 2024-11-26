export default function showPhone(phone: String) {
   const last = phone.replace(/.{3}/, '-')
   const first = phone.slice(0, 3)
   return first + last
}