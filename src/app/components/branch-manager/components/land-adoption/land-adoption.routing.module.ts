import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LandAdoptionGuard } from './shared/land-adoption.guard';
import { LandAdoptionNewComponent } from './land-adoption-new/land-adoption-new.component';
import { LandAdoptionEditComponent } from './land-adoption-edit/land-adoption-edit.component';
import { LandAdoptionListComponent } from './land-adoption-list/land-adoption-list.component';
import { LandAdoptionViewComponent } from './land-adoption-view/land-adoption-view.component';

const routes: Routes = [
  {
    path: '',
    component: LandAdoptionListComponent,
    canActivate: [LandAdoptionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LandAdoptionNewComponent,
    canActivate: [LandAdoptionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LandAdoptionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LandAdoptionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LandAdoptionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LandAdoptionRoutingModule {
}
