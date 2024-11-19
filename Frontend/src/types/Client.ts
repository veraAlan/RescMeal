export interface Client {
    id?: number
    name: string
    last_name: string
    phone: string
    balance?: number
    address: string
    birthdate: string
}

export interface ClientErrors {
    name?: string
    last_name?: string
    phone?: string
    address?: string
    birthdate?: string
}