import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-level-anzeige',
  templateUrl: './level-anzeige.component.html',
  styleUrls: ['./level-anzeige.component.scss']
})
export class LevelAnzeigeComponent implements OnInit {

  constructor(public user: UserService) { }

  ngOnInit() {
  }

}
