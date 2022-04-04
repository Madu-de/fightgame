import { Component, OnInit, ViewChild } from '@angular/core';
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
  private men: any = document.getElementsByClassName('men');
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
      this.men[0].classList.remove('none');
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
    if (gender == 'men') {
      this.user.gender = Gender.men;
    } else if (gender == 'women') {
      this.user.gender = Gender.women;
    }
    this.setup();
  }

  public setup() {
    this.user.health = Math.floor(Math.random() * 20 + 3);
    this.user.attack = Math.floor(Math.random() * 10 + 3);
    this.user.shield = 0;
    this.user.lvl = 0;
    this.user.xp = 0;
    this.user.gold = Math.floor(Math.random() * 5 + 1)
    this.game.saveInLocalStorage(this.user, this.game.enemy);
    location.reload();
  }
}
