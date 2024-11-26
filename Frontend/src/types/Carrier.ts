export interface Carrier {
    id?: number
    name: string
    last_name: string
    vehicle_type?: string
    phone?: string
    birthdate: string
}

export interface CarrierErrors {
    name?: string
    last_name?: string
    vehicle_type?: string
    phone?: string
    birthdate?: string
}