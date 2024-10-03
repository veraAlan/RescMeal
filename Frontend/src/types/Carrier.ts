export interface Carrier {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    vehicleType?: string;
    phone?: string;
    date: string;
}

export interface CarrierErrors {
    id?: string;
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    vehicleType?: string;
    phone?: string;
    date?: string;
}