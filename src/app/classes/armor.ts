import { Item } from "./item";

export class Armor extends Item {

    public durability: number;

    constructor(idName: string, name: string, description: string, attack: number, health: number, shield: number, price: number, durability: number) {
        super(idName, name, description, attack, health, shield, price);
        this.durability = durability;
    }
}
