import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EndOfASpecialVacationForEmployeeBGuard } from './shared/end-of-a-special-vacation-for-employee-b.guard';
import { EndOfASpecialVacationForEmployeeBNewComponent } from './end-of-a-special-vacation-for-employee-b-new/end-of-a-special-vacation-for-employee-b-new.component';
import { EndOfASpecialVacationForEmployeeBEditComponent } from './end-of-a-special-vacation-for-employee-b-edit/end-of-a-special-vacation-for-employee-b-edit.component';
import { EndOfASpecialVacationForEmployeeBListComponent } from './end-of-a-special-vacation-for-employee-b-list/end-of-a-special-vacation-for-employee-b-list.component';
import { EndOfASpecialVacationForEmployeeBViewComponent } from './end-of-a-special-vacation-for-employee-b-view/end-of-a-special-vacation-for-employee-b-view.component';

const routes: Routes = [
  {
    path: '',
    component: EndOfASpecialVacationForEmployeeBListComponent,
    canActivate: [EndOfASpecialVacationForEmployeeBGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeBNewComponent,
    canActivate: [EndOfASpecialVacationForEmployeeBGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeBEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeBListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeBViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EndOfASpecialVacationForEmployeeBRoutingModule {
}
