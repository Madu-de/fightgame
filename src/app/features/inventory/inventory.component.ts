import { Component, OnInit } from '@angular/core';
import { Potion } from 'src/app/classes/potion';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public pair: number[] = [];
  public buttonIsNotVisible: boolean = true;

  constructor(public game: GameService, public user: UserService) { }

  ngOnInit() {
    this.game.checkData('inventory', '');
    this.game.saveDataFromLocalStorage();

    for (let i = 0; i < this.getHTMLElementSlots().length; i++) {
      const element = this.getHTMLElementSlots()[i];
      element.addEventListener('click', () => {
        if (this.game.inventory[i]?.idName.startsWith('potion')) {
          this.buttonIsNotVisible = false;
        } else {
          this.buttonIsNotVisible = true;
        }

        this.addSlotToPair(i);
        this.showInformations(i);

      });
    }
  }

  private addSlotToPair(add: number): void {
    if (this.pair[0] == add) {
      return;
    }
    this.pair.push(add);
    if (this.pair.length == 2) {
      this.switchPositionOfItems(this.pair);
      this.pair = [];
    }
  }

  private switchPositionOfItems(pair: number[]) {
    let one = this.game.inventory[pair[0]];
    let two = this.game.inventory[pair[1]];
    if (one == undefined) { // click only on items
      return;
    }
    if (pair[0] == 0 && !one.idName.startsWith('sword') || pair[1] == 0 && !one.idName?.startsWith('sword')) {
      return; // only swords can be selected at inventory position 0
    }
    if (pair[0] == 1 && !one.idName.startsWith('armor') || pair[1] == 1 && !one.idName?.startsWith('armor')) {
      return; // only armor can be selected at inventory position 1
    }
    this.game.inventory[pair[0]] = two;
    this.game.inventory[pair[1]] = one;

  }

  private showInformations(slot: number) {
    //show informations of the item
  }

  public getHTMLElementSlots(): any[] {
    let swordSlot: HTMLElement | null = document.getElementById('sword_slot');
    let armorSlot: HTMLElement | null = document.getElementById('armor_slot');
    let two: HTMLElement | null = document.getElementById('2');
    let three: HTMLElement | null = document.getElementById('3');
    let four: HTMLElement | null = document.getElementById('4');
    let five: HTMLElement | null = document.getElementById('5');
    let six: HTMLElement | null = document.getElementById('6');
    let seven: HTMLElement | null = document.getElementById('7');
    let eight: HTMLElement | null = document.getElementById('8');
    let nine: HTMLElement | null = document.getElementById('9');
    let ten: HTMLElement | null = document.getElementById('10');
    return [swordSlot, armorSlot, two, three, four, five, six, seven, eight, nine, ten];
  }

  public buttonHandler(): void {
    let potion: Potion = this.game.inventory[this.pair[0]];
    this.game.inventory[this.pair[0]] = undefined;

    // Use the potion
    this.user.addAttack(potion.attack);
    this.user.addHealth(potion.health);
    this.user.addShield(potion.shield);
    this.user.activePotions.push(potion);
    this.game.saveInLocalStorage(this.user, this.game.enemy);

    this.buttonIsNotVisible = true;
    this.pair = [];
  }
}