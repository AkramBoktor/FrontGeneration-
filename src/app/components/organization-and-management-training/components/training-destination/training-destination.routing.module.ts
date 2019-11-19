import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TrainingDestinationGuard } from './shared/training-destination.guard';
import { TrainingDestinationNewComponent } from './training-destination-new/training-destination-new.component';
import { TrainingDestinationEditComponent } from './training-destination-edit/training-destination-edit.component';
import { TrainingDestinationListComponent } from './training-destination-list/training-destination-list.component';
import { TrainingDestinationViewComponent } from './training-destination-view/training-destination-view.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingDestinationListComponent,
    canActivate: [TrainingDestinationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TrainingDestinationNewComponent,
    canActivate: [TrainingDestinationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TrainingDestinationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TrainingDestinationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TrainingDestinationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TrainingDestinationRoutingModule {
}
