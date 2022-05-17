import { Item } from "./item";
import { Image } from '../interfaces/image';

export class Potion extends Item {

    public rounds: number | undefined;

    constructor(idName: string, name: string, description: string, attack: number, health: number, shield: number, price: number, image: Image, rounds: number) {
        super(idName, name, description, attack, health, shield, price, image);
        this.rounds = rounds;
    }
}
