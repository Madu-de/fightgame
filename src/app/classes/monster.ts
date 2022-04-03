import { MonsterSpezies } from '../enums/monsterSpezies.enum';
import { CardButton } from '../interfaces/cardButton';
import { MonsterImage } from '../interfaces/monsterImage';
import { MonsterStats } from '../interfaces/monsterStats';

export class Monster {
    public name: string = '';
    public description: string = '';
    public image: MonsterImage = {
        src: '',
        alt: ''
    };
    public spezies: MonsterSpezies = MonsterSpezies.goblin;
    public stats: MonsterStats = {
        attack: 0,
        life: 0,
        shield: 0
    };
    buttonLeft: CardButton = {
        content: '',
        show: true,
        click: () => { }
    };
    buttonRight: CardButton = {
        content: 'Kämpfen',
        show: true,
        click: () => { }
    };

    constructor(name: string, description: string, image: MonsterImage, spezies: MonsterSpezies, stats: MonsterStats, buttonLeft: CardButton, buttonRight: CardButton) {

    }
}
