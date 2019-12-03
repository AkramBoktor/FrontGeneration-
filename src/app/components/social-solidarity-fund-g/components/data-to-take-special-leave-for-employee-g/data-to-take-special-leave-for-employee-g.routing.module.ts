import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataToTakeSpecialLeaveForEmployeeGGuard } from './shared/data-to-take-special-leave-for-employee-g.guard';
import { DataToTakeSpecialLeaveForEmployeeGNewComponent } from './data-to-take-special-leave-for-employee-g-new/data-to-take-special-leave-for-employee-g-new.component';
import { DataToTakeSpecialLeaveForEmployeeGEditComponent } from './data-to-take-special-leave-for-employee-g-edit/data-to-take-special-leave-for-employee-g-edit.component';
import { DataToTakeSpecialLeaveForEmployeeGListComponent } from './data-to-take-special-leave-for-employee-g-list/data-to-take-special-leave-for-employee-g-list.component';
import { DataToTakeSpecialLeaveForEmployeeGViewComponent } from './data-to-take-special-leave-for-employee-g-view/data-to-take-special-leave-for-employee-g-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataToTakeSpecialLeaveForEmployeeGListComponent,
    canActivate: [DataToTakeSpecialLeaveForEmployeeGGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeGNewComponent,
    canActivate: [DataToTakeSpecialLeaveForEmployeeGGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeGEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeGListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeGViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataToTakeSpecialLeaveForEmployeeGRoutingModule {
}
