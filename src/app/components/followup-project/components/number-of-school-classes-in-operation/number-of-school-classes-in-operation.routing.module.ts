import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NumberOfSchoolClassesInOperationGuard } from './shared/number-of-school-classes-in-operation.guard';
import { NumberOfSchoolClassesInOperationNewComponent } from './number-of-school-classes-in-operation-new/number-of-school-classes-in-operation-new.component';
import { NumberOfSchoolClassesInOperationEditComponent } from './number-of-school-classes-in-operation-edit/number-of-school-classes-in-operation-edit.component';
import { NumberOfSchoolClassesInOperationListComponent } from './number-of-school-classes-in-operation-list/number-of-school-classes-in-operation-list.component';
import { NumberOfSchoolClassesInOperationViewComponent } from './number-of-school-classes-in-operation-view/number-of-school-classes-in-operation-view.component';

const routes: Routes = [
  {
    path: '',
    component: NumberOfSchoolClassesInOperationListComponent,
    canActivate: [NumberOfSchoolClassesInOperationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: NumberOfSchoolClassesInOperationNewComponent,
    canActivate: [NumberOfSchoolClassesInOperationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: NumberOfSchoolClassesInOperationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: NumberOfSchoolClassesInOperationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: NumberOfSchoolClassesInOperationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class NumberOfSchoolClassesInOperationRoutingModule {
}
