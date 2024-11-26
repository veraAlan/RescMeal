import { Carrier } from "./Carrier";
import { Client } from "./Client";
import { Purchase } from "./Purchase";

export interface Comment{
    id?: number;
    client: Client;
    carrier: Carrier;
    description: string;
    purchase: Purchase;
}

export interface CommentErrors{
    description: string;
}