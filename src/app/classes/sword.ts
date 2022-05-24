import { Item } from "./item";

export class Sword extends Item {

    public uses: number = 0;

    constructor(idName: string, name: string, description: string, attack: number, health: number, shield: number, price: number, uses: number) {
        super(idName, name, description, attack, health, shield, price);
        this.uses = uses;
    }
}
