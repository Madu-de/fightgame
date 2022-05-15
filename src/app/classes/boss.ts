import { MonsterSpezies } from '../enums/monsterSpezies.enum';
import { CardButton } from '../interfaces/cardButton';
import { MonsterImage } from '../interfaces/monsterImage';
import { Monster } from './monster';

export class Boss extends Monster {
    constructor(name: string, description: string, image: MonsterImage, spezies: MonsterSpezies, buttonLeft: CardButton, buttonRight: CardButton, xp: number) {
        super(name, description, image, spezies, buttonLeft, buttonRight, xp);
    }
}
