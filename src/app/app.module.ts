import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsBottomComponent } from './features/layout/buttons-bottom/buttons-bottom.component';
import { AnzeigeComponent } from './features/layout/anzeige/anzeige.component';
import { PlayComponent } from './features/play/play.component';
import { GameService } from './services/game.service';
import { UserService } from './services/user.service';
import { LevelAnzeigeComponent } from './features/layout/level-anzeige/level-anzeige.component';
import { DevToolsComponent } from './features/devTools/devTools.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsBottomComponent,
    AnzeigeComponent,
    LevelAnzeigeComponent,
    PlayComponent,
    DevToolsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
