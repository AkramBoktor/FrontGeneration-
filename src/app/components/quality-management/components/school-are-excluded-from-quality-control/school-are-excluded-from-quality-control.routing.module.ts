import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolAreExcludedFromQualityControlGuard } from './shared/school-are-excluded-from-quality-control.guard';
import { SchoolAreExcludedFromQualityControlNewComponent } from './school-are-excluded-from-quality-control-new/school-are-excluded-from-quality-control-new.component';
import { SchoolAreExcludedFromQualityControlEditComponent } from './school-are-excluded-from-quality-control-edit/school-are-excluded-from-quality-control-edit.component';
import { SchoolAreExcludedFromQualityControlListComponent } from './school-are-excluded-from-quality-control-list/school-are-excluded-from-quality-control-list.component';
import { SchoolAreExcludedFromQualityControlViewComponent } from './school-are-excluded-from-quality-control-view/school-are-excluded-from-quality-control-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAreExcludedFromQualityControlListComponent,
    canActivate: [SchoolAreExcludedFromQualityControlGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SchoolAreExcludedFromQualityControlNewComponent,
    canActivate: [SchoolAreExcludedFromQualityControlGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SchoolAreExcludedFromQualityControlEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SchoolAreExcludedFromQualityControlListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SchoolAreExcludedFromQualityControlViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolAreExcludedFromQualityControlRoutingModule {
}
