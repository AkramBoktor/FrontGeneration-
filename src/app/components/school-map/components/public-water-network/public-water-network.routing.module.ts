import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PublicWaterNetworkGuard } from './shared/public-water-network.guard';
import { PublicWaterNetworkNewComponent } from './public-water-network-new/public-water-network-new.component';
import { PublicWaterNetworkEditComponent } from './public-water-network-edit/public-water-network-edit.component';
import { PublicWaterNetworkListComponent } from './public-water-network-list/public-water-network-list.component';
import { PublicWaterNetworkViewComponent } from './public-water-network-view/public-water-network-view.component';

const routes: Routes = [
  {
    path: '',
    component: PublicWaterNetworkListComponent,
    canActivate: [PublicWaterNetworkGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PublicWaterNetworkNewComponent,
    canActivate: [PublicWaterNetworkGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PublicWaterNetworkEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PublicWaterNetworkListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PublicWaterNetworkViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PublicWaterNetworkRoutingModule {
}
