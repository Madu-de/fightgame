import { Item } from "./item";
import { Image } from '../interfaces/image';

export class Armor extends Item {

    public durability: number;

    constructor(idName: string, name: string, description: string, attack: number, health: number, shield: number, price: number, image: Image, durability: number) {
        super(idName, name, description, attack, health, shield, price, image);
        this.durability = durability;
    }
}
