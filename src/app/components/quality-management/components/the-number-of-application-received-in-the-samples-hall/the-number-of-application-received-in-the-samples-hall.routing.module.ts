import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TheNumberOfApplicationReceivedInTheSamplesHallGuard } from './shared/the-number-of-application-received-in-the-samples-hall.guard';
import { TheNumberOfApplicationReceivedInTheSamplesHallNewComponent } from './the-number-of-application-received-in-the-samples-hall-new/the-number-of-application-received-in-the-samples-hall-new.component';
import { TheNumberOfApplicationReceivedInTheSamplesHallEditComponent } from './the-number-of-application-received-in-the-samples-hall-edit/the-number-of-application-received-in-the-samples-hall-edit.component';
import { TheNumberOfApplicationReceivedInTheSamplesHallListComponent } from './the-number-of-application-received-in-the-samples-hall-list/the-number-of-application-received-in-the-samples-hall-list.component';
import { TheNumberOfApplicationReceivedInTheSamplesHallViewComponent } from './the-number-of-application-received-in-the-samples-hall-view/the-number-of-application-received-in-the-samples-hall-view.component';

const routes: Routes = [
  {
    path: '',
    component: TheNumberOfApplicationReceivedInTheSamplesHallListComponent,
    canActivate: [TheNumberOfApplicationReceivedInTheSamplesHallGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TheNumberOfApplicationReceivedInTheSamplesHallNewComponent,
    canActivate: [TheNumberOfApplicationReceivedInTheSamplesHallGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TheNumberOfApplicationReceivedInTheSamplesHallEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TheNumberOfApplicationReceivedInTheSamplesHallListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TheNumberOfApplicationReceivedInTheSamplesHallViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TheNumberOfApplicationReceivedInTheSamplesHallRoutingModule {
}
