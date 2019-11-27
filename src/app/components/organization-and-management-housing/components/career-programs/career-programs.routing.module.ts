import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CareerProgramsGuard } from './shared/career-programs.guard';
import { CareerProgramsNewComponent } from './career-programs-new/career-programs-new.component';
import { CareerProgramsEditComponent } from './career-programs-edit/career-programs-edit.component';
import { CareerProgramsListComponent } from './career-programs-list/career-programs-list.component';
import { CareerProgramsViewComponent } from './career-programs-view/career-programs-view.component';

const routes: Routes = [
  {
    path: '',
    component: CareerProgramsListComponent,
    canActivate: [CareerProgramsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CareerProgramsNewComponent,
    canActivate: [CareerProgramsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CareerProgramsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CareerProgramsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CareerProgramsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CareerProgramsRoutingModule {
}
