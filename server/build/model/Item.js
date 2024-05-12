"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ItemSchema = new mongoose_1.default.Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    owner: { type: String, required: false },
    boughtBy: { type: String, required: false },
    image: { type: String, required: false }
});
exports.Item = mongoose_1.default.model('Item', ItemSchema);
