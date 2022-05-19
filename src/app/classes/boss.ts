import { MonsterSpezies } from '../enums/monsterSpezies.enum';
import { CardButton } from '../interfaces/cardButton';
import { Monster } from './monster';

export class Boss extends Monster {
    public id: number | undefined;
    constructor(id: number, name: string, description: string, spezies: MonsterSpezies, buttonLeft: CardButton, buttonRight: CardButton, xp: number) {
        super(name, description, spezies, buttonLeft, buttonRight, xp);
        this.id = id;
    }
}
