import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { IncubationProgramGuard } from './shared/incubation-program.guard';
import { IncubationProgramNewComponent } from './incubation-program-new/incubation-program-new.component';
import { IncubationProgramEditComponent } from './incubation-program-edit/incubation-program-edit.component';
import { IncubationProgramListComponent } from './incubation-program-list/incubation-program-list.component';
import { IncubationProgramViewComponent } from './incubation-program-view/incubation-program-view.component';

const routes: Routes = [
  {
    path: '',
    component: IncubationProgramListComponent,
    canActivate: [IncubationProgramGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: IncubationProgramNewComponent,
    canActivate: [IncubationProgramGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: IncubationProgramEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: IncubationProgramListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: IncubationProgramViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class IncubationProgramRoutingModule {
}
