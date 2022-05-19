import { Item } from "./item";

export class Potion extends Item {

    public rounds: number | undefined;

    constructor(idName: string, name: string, description: string, attack: number, health: number, shield: number, price: number, rounds: number) {
        super(idName, name, description, attack, health, shield, price);
        this.rounds = rounds;
    }
}
