export interface User {
   username?: string
   email?: string
   role?: string
   password?: string
}
export interface UserUpdate {
   username?: string
   email?: string
   role?: string
   password?: string | null
}