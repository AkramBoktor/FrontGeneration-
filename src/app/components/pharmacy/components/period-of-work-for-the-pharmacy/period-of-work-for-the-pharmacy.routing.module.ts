import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PeriodOfWorkForThePharmacyGuard } from './shared/period-of-work-for-the-pharmacy.guard';
import { PeriodOfWorkForThePharmacyNewComponent } from './period-of-work-for-the-pharmacy-new/period-of-work-for-the-pharmacy-new.component';
import { PeriodOfWorkForThePharmacyEditComponent } from './period-of-work-for-the-pharmacy-edit/period-of-work-for-the-pharmacy-edit.component';
import { PeriodOfWorkForThePharmacyListComponent } from './period-of-work-for-the-pharmacy-list/period-of-work-for-the-pharmacy-list.component';
import { PeriodOfWorkForThePharmacyViewComponent } from './period-of-work-for-the-pharmacy-view/period-of-work-for-the-pharmacy-view.component';

const routes: Routes = [
  {
    path: '',
    component: PeriodOfWorkForThePharmacyListComponent,
    canActivate: [PeriodOfWorkForThePharmacyGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PeriodOfWorkForThePharmacyNewComponent,
    canActivate: [PeriodOfWorkForThePharmacyGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PeriodOfWorkForThePharmacyEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PeriodOfWorkForThePharmacyListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PeriodOfWorkForThePharmacyViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PeriodOfWorkForThePharmacyRoutingModule {
}
