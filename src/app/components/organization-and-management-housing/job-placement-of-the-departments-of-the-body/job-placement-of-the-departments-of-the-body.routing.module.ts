import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { JobPlacementOfTheDepartmentsOfTheBodyGuard } from './shared/job-placement-of-the-departments-of-the-body.guard';
import { JobPlacementOfTheDepartmentsOfTheBodyNewComponent } from './job-placement-of-the-departments-of-the-body-new/job-placement-of-the-departments-of-the-body-new.component';
import { JobPlacementOfTheDepartmentsOfTheBodyEditComponent } from './job-placement-of-the-departments-of-the-body-edit/job-placement-of-the-departments-of-the-body-edit.component';
import { JobPlacementOfTheDepartmentsOfTheBodyListComponent } from './job-placement-of-the-departments-of-the-body-list/job-placement-of-the-departments-of-the-body-list.component';
import { JobPlacementOfTheDepartmentsOfTheBodyViewComponent } from './job-placement-of-the-departments-of-the-body-view/job-placement-of-the-departments-of-the-body-view.component';

const routes: Routes = [
  {
    path: '',
    component: JobPlacementOfTheDepartmentsOfTheBodyListComponent,
    canActivate: [JobPlacementOfTheDepartmentsOfTheBodyGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: JobPlacementOfTheDepartmentsOfTheBodyNewComponent,
    canActivate: [JobPlacementOfTheDepartmentsOfTheBodyGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: JobPlacementOfTheDepartmentsOfTheBodyEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: JobPlacementOfTheDepartmentsOfTheBodyListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: JobPlacementOfTheDepartmentsOfTheBodyViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class JobPlacementOfTheDepartmentsOfTheBodyRoutingModule {
}
