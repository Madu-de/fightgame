import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayComponent } from './features/play/play.component';
import { LoadComponent } from './features/load/load.component';
import { CreateComponent } from './features/create/create.component'
import { InventoryComponent } from './features/inventory/inventory.component';
import { ShopComponent } from './features/shop/shop.component';
import { SettingsComponent } from './features/settings/settings.component';

const routes: Routes = [
  { path: '', component: LoadComponent },
  { path: 'play', component: PlayComponent },
  { path: 'create', component: CreateComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: LoadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }