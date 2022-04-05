import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayComponent } from './features/play/play.component';
import { LoadComponent } from './features/load/load.component';
import { CreateComponent } from './features/create/create.component'

const routes: Routes = [
  { path: '', component: LoadComponent },
  { path: 'play', component: PlayComponent },
  { path: 'create', component: CreateComponent },
  /*
  { path: 'shop', component: shop},
  { path: 'accessoires', component: accessoires},
  { path: 'settings', component: settings}
  */
  { path: '**', component: LoadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }