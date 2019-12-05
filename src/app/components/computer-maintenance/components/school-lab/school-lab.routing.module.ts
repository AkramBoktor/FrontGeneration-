import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolLabGuard } from './shared/school-lab.guard';
import { SchoolLabNewComponent } from './school-lab-new/school-lab-new.component';
import { SchoolLabEditComponent } from './school-lab-edit/school-lab-edit.component';
import { SchoolLabListComponent } from './school-lab-list/school-lab-list.component';
import { SchoolLabViewComponent } from './school-lab-view/school-lab-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolLabListComponent,
    canActivate: [SchoolLabGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SchoolLabNewComponent,
    canActivate: [SchoolLabGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SchoolLabEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SchoolLabListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SchoolLabViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolLabRoutingModule {
}
