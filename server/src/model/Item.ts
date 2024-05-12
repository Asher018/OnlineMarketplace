import mongoose, { Document, Model, Schema } from 'mongoose';

interface IItem extends Document {
    name: string;
    description: string;
    price: number;
    owner: string;
    boughtBy: string;
    image: string;
}

const ItemSchema: Schema<IItem> = new mongoose.Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    owner: { type: String, required: false },
    boughtBy: { type: String, required: false },
    image: { type: String, required: false}
});


export const Item: Model<IItem> = mongoose.model<IItem>('Item', ItemSchema);