import { MonsterSpezies } from '../enums/monsterSpezies.enum';
import { CardButton } from '../interfaces/cardButton';
import { MonsterImage } from '../interfaces/monsterImage';
import { MonsterStats } from '../interfaces/monsterStats';
import { MinMax } from '../interfaces/minMax';

export class Monster {
    public name: string = '';
    public description: string = '';
    public image: MonsterImage = {
        src: '',
        alt: ''
    };
    public spezies: MonsterSpezies = MonsterSpezies.Goblin;
    public stats: MonsterStats = {
        attack: 0,
        life: 0,
        shield: 0
    };
    buttonLeft: CardButton = {
        content: 'Gehen',
        show: true,
        click: () => { }
    };
    buttonRight: CardButton = {
        content: 'Kämpfen',
        show: true,
        click: () => { }
    };
    public xp: number = 0;

    constructor(name: string, description: string, image: MonsterImage, spezies: MonsterSpezies, buttonLeft: CardButton, buttonRight: CardButton, xp: number) {
        this.name = name;
        this.description = description;
        this.image = { src: './assets/card-images/' + image.src, alt: image.alt };
        this.spezies = spezies;
        this.buttonLeft = buttonLeft;
        this.buttonRight = buttonRight;
        this.xp = xp;
    }

    public setStats(level: number) {
        switch (this.spezies) {
            case MonsterSpezies.Troll:
                this.setupStats({ max: 15, min: 10 }, { max: 20, min: 15 }, { max: 15, min: 5 }, level);
                break;
            case MonsterSpezies.Goblin:
                this.setupStats({ max: 20, min: 15 }, { max: 25, min: 15 }, { max: 20, min: 10 }, level);
                break;
            case MonsterSpezies.Herrscher:
                this.setupStats({ max: 50, min: 30 }, { max: 50, min: 20 }, { max: 30, min: 20 }, level);
                break;
            case MonsterSpezies.Hexe:
                this.setupStats({ max: 45, min: 20 }, { max: 60, min: 40 }, { max: 10, min: 5 }, level);
                break;
            case MonsterSpezies.Assasine:
                this.setupStats({ max: 50, min: 30 }, { max: 25, min: 20 }, { max: 5, min: 2 }, level);
                break;
            case MonsterSpezies.Ork:
                this.setupStats({ max: 50, min: 15 }, { max: 45, min: 15 }, { max: 20, min: 10 }, level);
                break;
            case MonsterSpezies.Drache:
                this.setupStats({ max: 60, min: 20 }, { max: 65, min: 25 }, { max: 10, min: 20 }, level);
                break;
            default:
                this.setupStats({ max: 5, min: 15 }, { max: 20, min: 10 }, { max: 20, min: 5 }, level);
                break;
        }
    }

    private setupStats(attack: MinMax, life: MinMax, shield: MinMax, level: number) {
        this.stats = {
            attack: (Math.floor(Math.random() * attack.max) + (attack.min + 1)) * (level / 10),
            life: (Math.floor(Math.random() * life.max) + (life.min + 1)) * (level / 10),
            shield: (Math.floor(Math.random() * shield.max) + (shield.min + 1)) * (level / 10)
        }
    }
}
