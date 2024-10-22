export interface Business {
    id?: number;
    image: string | File;
    name: string;
    type: string;
    address: string;
    phone: string;
    schedule: string;
    cvu: string;
}

export interface BusinessErrors {
    image?: string;
    name?: string;
    type?: string;
    address?: string;
    phone?: string;
    schedule?: string;
    cvu?: string;
}