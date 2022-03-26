import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsBottomComponent } from './features/layout/buttons-bottom/buttons-bottom.component';
import { AnzeigeComponent } from './features/layout/anzeige/anzeige.component';
import { LevelAnzeigeComponent } from './features/layout/level-anzeige/level-anzeige.component'
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsBottomComponent,
    AnzeigeComponent,
    LevelAnzeigeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
