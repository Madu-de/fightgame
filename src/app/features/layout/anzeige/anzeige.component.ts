import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-anzeige',
  templateUrl: './anzeige.component.html',
  styleUrls: ['./anzeige.component.scss']
})
export class AnzeigeComponent implements OnInit {

  constructor(public user: UserService) { }

  ngOnInit() {
  }

}
