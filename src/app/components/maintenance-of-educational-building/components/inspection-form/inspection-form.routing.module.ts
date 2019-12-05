import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InspectionFormGuard } from './shared/inspection-form.guard';
import { InspectionFormNewComponent } from './inspection-form-new/inspection-form-new.component';
import { InspectionFormEditComponent } from './inspection-form-edit/inspection-form-edit.component';
import { InspectionFormListComponent } from './inspection-form-list/inspection-form-list.component';
import { InspectionFormViewComponent } from './inspection-form-view/inspection-form-view.component';

const routes: Routes = [
  {
    path: '',
    component: InspectionFormListComponent,
    canActivate: [InspectionFormGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: InspectionFormNewComponent,
    canActivate: [InspectionFormGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: InspectionFormEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: InspectionFormListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: InspectionFormViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InspectionFormRoutingModule {
}
