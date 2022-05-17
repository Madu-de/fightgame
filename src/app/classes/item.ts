import { Image } from '../interfaces/image';

/*
Item:
Ein Item muss den User immer etwas bringen.
Beispiele: 
Schwert: Mehr Attack
Heilungstrank: Einmalig mehr Leben
Rüstung: Schild
*/
export class Item {
    public idName: string | undefined;
    public name: string | undefined;
    public description: string | undefined;
    public attack: number | undefined;
    public health: number | undefined;
    public shield: number | undefined;
    public price: number | undefined;
    public image: Image;

    constructor(idName: string, name: string, description: string, attack: number, health: number, shield: number, price: number, image: Image) {
        this.idName = idName;
        this.name = name;
        this.description = description
        this.attack = attack;
        this.health = health;
        this.shield = shield;
        this.price = price;
        this.image = { src: './assets/item-images/' + image.src, alt: image.alt };
    }
}
