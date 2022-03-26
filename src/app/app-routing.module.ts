import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayComponent } from './features/play/play.component';

const routes: Routes = [
  { path: '', component: PlayComponent },
  { path: 'play', component: PlayComponent }
  /*{ path: 'shop', component: shop},
  { path: 'accessoires', component: accessoires},
  { path: 'settings', component: settings}
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }