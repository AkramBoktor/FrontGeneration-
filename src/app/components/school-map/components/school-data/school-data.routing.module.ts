import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolDataGuard } from './shared/school-data.guard';
import { SchoolDataNewComponent } from './school-data-new/school-data-new.component';
import { SchoolDataEditComponent } from './school-data-edit/school-data-edit.component';
import { SchoolDataListComponent } from './school-data-list/school-data-list.component';
import { SchoolDataViewComponent } from './school-data-view/school-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolDataListComponent,
    canActivate: [SchoolDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SchoolDataNewComponent,
    canActivate: [SchoolDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SchoolDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SchoolDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SchoolDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolDataRoutingModule {
}
