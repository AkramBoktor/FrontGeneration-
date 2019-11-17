import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PeriodOfWorkForTheClinicGuard } from './shared/period-of-work-for-the-clinic.guard';
import { PeriodOfWorkForTheClinicNewComponent } from './period-of-work-for-the-clinic-new/period-of-work-for-the-clinic-new.component';
import { PeriodOfWorkForTheClinicEditComponent } from './period-of-work-for-the-clinic-edit/period-of-work-for-the-clinic-edit.component';
import { PeriodOfWorkForTheClinicListComponent } from './period-of-work-for-the-clinic-list/period-of-work-for-the-clinic-list.component';
import { PeriodOfWorkForTheClinicViewComponent } from './period-of-work-for-the-clinic-view/period-of-work-for-the-clinic-view.component';

const routes: Routes = [
  {
    path: '',
    component: PeriodOfWorkForTheClinicListComponent,
    canActivate: [PeriodOfWorkForTheClinicGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PeriodOfWorkForTheClinicNewComponent,
    canActivate: [PeriodOfWorkForTheClinicGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PeriodOfWorkForTheClinicEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PeriodOfWorkForTheClinicListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PeriodOfWorkForTheClinicViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PeriodOfWorkForTheClinicRoutingModule {
}
