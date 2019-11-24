import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolPeriodGuard } from './shared/school-period.guard';
import { SchoolPeriodNewComponent } from './school-period-new/school-period-new.component';
import { SchoolPeriodEditComponent } from './school-period-edit/school-period-edit.component';
import { SchoolPeriodListComponent } from './school-period-list/school-period-list.component';
import { SchoolPeriodViewComponent } from './school-period-view/school-period-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolPeriodListComponent,
    canActivate: [SchoolPeriodGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SchoolPeriodNewComponent,
    canActivate: [SchoolPeriodGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SchoolPeriodEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SchoolPeriodListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SchoolPeriodViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolPeriodRoutingModule {
}
