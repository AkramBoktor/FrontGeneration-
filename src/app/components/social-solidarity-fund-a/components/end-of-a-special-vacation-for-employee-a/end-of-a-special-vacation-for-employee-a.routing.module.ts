import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EndOfASpecialVacationForEmployeeAGuard } from './shared/end-of-a-special-vacation-for-employee-a.guard';
import { EndOfASpecialVacationForEmployeeANewComponent } from './end-of-a-special-vacation-for-employee-a-new/end-of-a-special-vacation-for-employee-a-new.component';
import { EndOfASpecialVacationForEmployeeAEditComponent } from './end-of-a-special-vacation-for-employee-a-edit/end-of-a-special-vacation-for-employee-a-edit.component';
import { EndOfASpecialVacationForEmployeeAListComponent } from './end-of-a-special-vacation-for-employee-a-list/end-of-a-special-vacation-for-employee-a-list.component';
import { EndOfASpecialVacationForEmployeeAViewComponent } from './end-of-a-special-vacation-for-employee-a-view/end-of-a-special-vacation-for-employee-a-view.component';

const routes: Routes = [
  {
    path: '',
    component: EndOfASpecialVacationForEmployeeAListComponent,
    canActivate: [EndOfASpecialVacationForEmployeeAGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeANewComponent,
    canActivate: [EndOfASpecialVacationForEmployeeAGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeAEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeAListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeAViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EndOfASpecialVacationForEmployeeARoutingModule {
}
