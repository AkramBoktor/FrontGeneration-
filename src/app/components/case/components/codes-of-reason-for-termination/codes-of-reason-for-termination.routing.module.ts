import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CodesOfReasonForTerminationGuard } from './shared/codes-of-reason-for-termination.guard';
import { CodesOfReasonForTerminationNewComponent } from './codes-of-reason-for-termination-new/codes-of-reason-for-termination-new.component';
import { CodesOfReasonForTerminationEditComponent } from './codes-of-reason-for-termination-edit/codes-of-reason-for-termination-edit.component';
import { CodesOfReasonForTerminationListComponent } from './codes-of-reason-for-termination-list/codes-of-reason-for-termination-list.component';
import { CodesOfReasonForTerminationViewComponent } from './codes-of-reason-for-termination-view/codes-of-reason-for-termination-view.component';

const routes: Routes = [
  {
    path: '',
    component: CodesOfReasonForTerminationListComponent,
    canActivate: [CodesOfReasonForTerminationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CodesOfReasonForTerminationNewComponent,
    canActivate: [CodesOfReasonForTerminationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CodesOfReasonForTerminationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CodesOfReasonForTerminationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CodesOfReasonForTerminationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CodesOfReasonForTerminationRoutingModule {
}
