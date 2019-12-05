import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RegisterTheMovementOfReadyToiletsGuard } from './shared/register-the-movement-of-ready-toilets.guard';
import { RegisterTheMovementOfReadyToiletsNewComponent } from './register-the-movement-of-ready-toilets-new/register-the-movement-of-ready-toilets-new.component';
import { RegisterTheMovementOfReadyToiletsEditComponent } from './register-the-movement-of-ready-toilets-edit/register-the-movement-of-ready-toilets-edit.component';
import { RegisterTheMovementOfReadyToiletsListComponent } from './register-the-movement-of-ready-toilets-list/register-the-movement-of-ready-toilets-list.component';
import { RegisterTheMovementOfReadyToiletsViewComponent } from './register-the-movement-of-ready-toilets-view/register-the-movement-of-ready-toilets-view.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterTheMovementOfReadyToiletsListComponent,
    canActivate: [RegisterTheMovementOfReadyToiletsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RegisterTheMovementOfReadyToiletsNewComponent,
    canActivate: [RegisterTheMovementOfReadyToiletsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RegisterTheMovementOfReadyToiletsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RegisterTheMovementOfReadyToiletsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RegisterTheMovementOfReadyToiletsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RegisterTheMovementOfReadyToiletsRoutingModule {
}
