import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataToTakeSpecialLeaveForEmployeeAGuard } from './shared/data-to-take-special-leave-for-employee-a.guard';
import { DataToTakeSpecialLeaveForEmployeeANewComponent } from './data-to-take-special-leave-for-employee-a-new/data-to-take-special-leave-for-employee-a-new.component';
import { DataToTakeSpecialLeaveForEmployeeAEditComponent } from './data-to-take-special-leave-for-employee-a-edit/data-to-take-special-leave-for-employee-a-edit.component';
import { DataToTakeSpecialLeaveForEmployeeAListComponent } from './data-to-take-special-leave-for-employee-a-list/data-to-take-special-leave-for-employee-a-list.component';
import { DataToTakeSpecialLeaveForEmployeeAViewComponent } from './data-to-take-special-leave-for-employee-a-view/data-to-take-special-leave-for-employee-a-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataToTakeSpecialLeaveForEmployeeAListComponent,
    canActivate: [DataToTakeSpecialLeaveForEmployeeAGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeANewComponent,
    canActivate: [DataToTakeSpecialLeaveForEmployeeAGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeAEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeAListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeAViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataToTakeSpecialLeaveForEmployeeARoutingModule {
}
