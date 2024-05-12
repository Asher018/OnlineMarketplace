export interface Item {
    name: string;
    description: string | null;
    price: number;
    owner: string;
    boughtBy: string | null;
    image: string
}