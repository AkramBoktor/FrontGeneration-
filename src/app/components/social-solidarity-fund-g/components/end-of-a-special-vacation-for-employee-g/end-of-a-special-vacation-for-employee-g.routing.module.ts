import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EndOfASpecialVacationForEmployeeGGuard } from './shared/end-of-a-special-vacation-for-employee-g.guard';
import { EndOfASpecialVacationForEmployeeGNewComponent } from './end-of-a-special-vacation-for-employee-g-new/end-of-a-special-vacation-for-employee-g-new.component';
import { EndOfASpecialVacationForEmployeeGEditComponent } from './end-of-a-special-vacation-for-employee-g-edit/end-of-a-special-vacation-for-employee-g-edit.component';
import { EndOfASpecialVacationForEmployeeGListComponent } from './end-of-a-special-vacation-for-employee-g-list/end-of-a-special-vacation-for-employee-g-list.component';
import { EndOfASpecialVacationForEmployeeGViewComponent } from './end-of-a-special-vacation-for-employee-g-view/end-of-a-special-vacation-for-employee-g-view.component';

const routes: Routes = [
  {
    path: '',
    component: EndOfASpecialVacationForEmployeeGListComponent,
    canActivate: [EndOfASpecialVacationForEmployeeGGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeGNewComponent,
    canActivate: [EndOfASpecialVacationForEmployeeGGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeGEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeGListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EndOfASpecialVacationForEmployeeGViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EndOfASpecialVacationForEmployeeGRoutingModule {
}
