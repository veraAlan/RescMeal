export interface Client {
    id?: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    balance?: number;
    address: string;
    birthdate: string;
}

export interface ClientErrors {
    name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    password?: string;
    address?: string;
    birthdate?: string;
}