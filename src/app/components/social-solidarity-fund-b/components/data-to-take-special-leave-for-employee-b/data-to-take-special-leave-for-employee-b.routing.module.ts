import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataToTakeSpecialLeaveForEmployeeBGuard } from './shared/data-to-take-special-leave-for-employee-b.guard';
import { DataToTakeSpecialLeaveForEmployeeBNewComponent } from './data-to-take-special-leave-for-employee-b-new/data-to-take-special-leave-for-employee-b-new.component';
import { DataToTakeSpecialLeaveForEmployeeBEditComponent } from './data-to-take-special-leave-for-employee-b-edit/data-to-take-special-leave-for-employee-b-edit.component';
import { DataToTakeSpecialLeaveForEmployeeBListComponent } from './data-to-take-special-leave-for-employee-b-list/data-to-take-special-leave-for-employee-b-list.component';
import { DataToTakeSpecialLeaveForEmployeeBViewComponent } from './data-to-take-special-leave-for-employee-b-view/data-to-take-special-leave-for-employee-b-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataToTakeSpecialLeaveForEmployeeBListComponent,
    canActivate: [DataToTakeSpecialLeaveForEmployeeBGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeBNewComponent,
    canActivate: [DataToTakeSpecialLeaveForEmployeeBGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeBEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeBListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataToTakeSpecialLeaveForEmployeeBViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataToTakeSpecialLeaveForEmployeeBRoutingModule {
}
