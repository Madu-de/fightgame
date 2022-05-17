import { Item } from "./item";
import { Image } from '../interfaces/image';

export class Sword extends Item {

    public uses: number | undefined;

    constructor(idName: string, name: string, description: string, attack: number, health: number, shield: number, price: number, image: Image, uses: number) {
        super(idName, name, description, attack, health, shield, price, image);
        this.uses = uses;
    }
}
