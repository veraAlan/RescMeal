export interface Carrier {
    id?: number
    name: string
    lastName: string
    vehicleType?: string
    phone?: string
    date: string
}

export interface CarrierErrors {
    name?: string
    lastName?: string
    vehicleType?: string
    phone?: string
    date?: string
}