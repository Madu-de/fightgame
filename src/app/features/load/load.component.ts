import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-load',
  template: '',
  styles: ['']
})
export class LoadComponent implements OnInit {

  constructor(private game: GameService) { }

  ngOnInit() {
    this.checkIfCookiesAreEnabled();
    this.game.checkData('play', 'create');
  }

  public checkIfCookiesAreEnabled() {
    let test: any;
    try {
      localStorage.setItem('fg:test', 'true');
      test = localStorage.getItem('fg:test');
      localStorage.removeItem('fg:test');
      if (localStorage.getItem('fg:cookieAlert') == undefined) {
        localStorage.setItem('fg:cookieAlert', 'false');
      }
    } catch (e) {
      test = false;
    }
    if (test == false) {
      alert('Bitte aktiviere deine Cookies, damit wir dein Spielstand speichern können.');
    } else if (test == 'true' && localStorage.getItem('fg:cookieAlert') == 'false') {
      localStorage.setItem('fg:cookieAlert', 'true');
      alert('Diese Website benutzt den Localstorage / Cookies um deinen Spielstand zu speichern.');
    }
  }
}
