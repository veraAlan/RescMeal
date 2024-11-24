export interface Client {
    id?: number
    name: string
    last_name: string
    phone: string
    balance?: number
    birthdate: string
}

export interface ClientErrors {
    name?: string
    last_name?: string
    phone?: string
    birthdate?: string
}