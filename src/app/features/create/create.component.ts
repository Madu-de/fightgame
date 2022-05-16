import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { UserService } from 'src/app/services/user.service';
import { Gender } from '../../enums/gender.enum';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  private nameInput: any = document.getElementsByClassName('createNameInput');
  private button: any = document.getElementsByClassName('createSubmitButton');
  private name: any = document.getElementsByClassName('name');
  private man: any = document.getElementsByClassName('man');
  private women: any = document.getElementsByClassName('women');

  constructor(private game: GameService, private user: UserService) { }

  ngOnInit() {
    this.game.checkData('', 'create');
  }

  public saveName() {
    let name = this.nameInput[0].value;
    if (name == '') {
      alert('Bitte gebe einen Namen ein.');
      return;
    }
    this.user.username = name;
    setTimeout(() => {
      this.name[0].classList.add('none');
      this.man[0].classList.remove('none');
      this.women[0].classList.remove('none');
    }, 300);
  }

  public checkValue() {
    let name = this.nameInput[0].value;
    if (name != '') {
      this.button[0].removeAttribute('disabled')
    } else {
      this.button[0].setAttribute('disabled', 'disabled');
    }
  }

  public saveGender(gender: string) {
    if (gender == 'man') {
      this.user.gender = Gender.man;
    } else if (gender == 'women') {
      this.user.gender = Gender.women;
    }
    this.setup();
  }

  public setup() {
    this.user.attack = Math.floor(Math.random() * 5 + 3);
    this.user.health = Math.floor(Math.random() * 10 + this.user.attack);
    this.user.gold = Math.floor(Math.random() * 5 + 1);
    this.user.lvl = 1;
    this.user.maxXp = 50;
    this.game.enemy.setStats(this.user.lvl);
    this.game.saveInLocalStorage(this.user, this.game.enemy);
    location.href = '/';
  }
}
