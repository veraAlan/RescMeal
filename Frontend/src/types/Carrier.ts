export interface Carrier {
    id?: number
    name: string
    lastName: string
    vehicleType?: string
    phone?: string
    birthdate: string
}

export interface CarrierErrors {
    name?: string
    lastName?: string
    vehicleType?: string
    phone?: string
    birthdate?: string
}