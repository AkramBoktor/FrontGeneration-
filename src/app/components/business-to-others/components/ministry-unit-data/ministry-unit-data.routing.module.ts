import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MinistryUnitDataGuard } from './shared/ministry-unit-data.guard';
import { MinistryUnitDataNewComponent } from './ministry-unit-data-new/ministry-unit-data-new.component';
import { MinistryUnitDataEditComponent } from './ministry-unit-data-edit/ministry-unit-data-edit.component';
import { MinistryUnitDataListComponent } from './ministry-unit-data-list/ministry-unit-data-list.component';
import { MinistryUnitDataViewComponent } from './ministry-unit-data-view/ministry-unit-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: MinistryUnitDataListComponent,
    canActivate: [MinistryUnitDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MinistryUnitDataNewComponent,
    canActivate: [MinistryUnitDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MinistryUnitDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MinistryUnitDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MinistryUnitDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MinistryUnitDataRoutingModule {
}
