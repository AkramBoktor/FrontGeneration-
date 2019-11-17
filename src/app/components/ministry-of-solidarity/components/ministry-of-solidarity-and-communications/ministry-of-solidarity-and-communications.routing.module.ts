import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MinistryOfSolidarityAndCommunicationsGuard } from './shared/ministry-of-solidarity-and-communications.guard';
import { MinistryOfSolidarityAndCommunicationsNewComponent } from './ministry-of-solidarity-and-communications-new/ministry-of-solidarity-and-communications-new.component';
import { MinistryOfSolidarityAndCommunicationsEditComponent } from './ministry-of-solidarity-and-communications-edit/ministry-of-solidarity-and-communications-edit.component';
import { MinistryOfSolidarityAndCommunicationsListComponent } from './ministry-of-solidarity-and-communications-list/ministry-of-solidarity-and-communications-list.component';
import { MinistryOfSolidarityAndCommunicationsViewComponent } from './ministry-of-solidarity-and-communications-view/ministry-of-solidarity-and-communications-view.component';

const routes: Routes = [
  {
    path: '',
    component: MinistryOfSolidarityAndCommunicationsListComponent,
    canActivate: [MinistryOfSolidarityAndCommunicationsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MinistryOfSolidarityAndCommunicationsNewComponent,
    canActivate: [MinistryOfSolidarityAndCommunicationsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MinistryOfSolidarityAndCommunicationsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MinistryOfSolidarityAndCommunicationsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MinistryOfSolidarityAndCommunicationsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MinistryOfSolidarityAndCommunicationsRoutingModule {
}
