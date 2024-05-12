export interface Item {
    _id: string;
    name: string;
    description: string | null;
    price: number;
    owner: string;
    boughtBy: string | null;
    image: string
}