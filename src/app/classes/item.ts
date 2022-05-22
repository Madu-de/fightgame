import { Image } from '../classes/image';

export class Item {
    public idName: string | undefined;
    public name: string | undefined;
    public description: string | undefined;
    public attack: number = 0;
    public health: number = 0;
    public shield: number = 0;
    public price: number | undefined;
    public image: Image;

    constructor(idName: string, name: string, description: string, attack: number, health: number, shield: number, price: number) {
        this.idName = idName;
        this.name = name;
        this.description = description
        this.attack = attack;
        this.health = health;
        this.shield = shield;
        this.price = price;
        this.image = new Image('./assets/item-images/' + idName.toLowerCase() + '.png', name);
    }
}
