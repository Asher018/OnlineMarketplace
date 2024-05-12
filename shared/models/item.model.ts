export interface item {
    id: string;
    name: string;
    description: string | null;
    price: number;
    owner: string;
    boughtBy: string | null;
}