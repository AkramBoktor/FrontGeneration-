import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ReasonForEndingEngineerHousingOnProjectGuard } from './shared/reason-for-ending-engineer-housing-on-project.guard';
import { ReasonForEndingEngineerHousingOnProjectNewComponent } from './reason-for-ending-engineer-housing-on-project-new/reason-for-ending-engineer-housing-on-project-new.component';
import { ReasonForEndingEngineerHousingOnProjectEditComponent } from './reason-for-ending-engineer-housing-on-project-edit/reason-for-ending-engineer-housing-on-project-edit.component';
import { ReasonForEndingEngineerHousingOnProjectListComponent } from './reason-for-ending-engineer-housing-on-project-list/reason-for-ending-engineer-housing-on-project-list.component';
import { ReasonForEndingEngineerHousingOnProjectViewComponent } from './reason-for-ending-engineer-housing-on-project-view/reason-for-ending-engineer-housing-on-project-view.component';

const routes: Routes = [
  {
    path: '',
    component: ReasonForEndingEngineerHousingOnProjectListComponent,
    canActivate: [ReasonForEndingEngineerHousingOnProjectGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ReasonForEndingEngineerHousingOnProjectNewComponent,
    canActivate: [ReasonForEndingEngineerHousingOnProjectGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ReasonForEndingEngineerHousingOnProjectEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ReasonForEndingEngineerHousingOnProjectListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ReasonForEndingEngineerHousingOnProjectViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ReasonForEndingEngineerHousingOnProjectRoutingModule {
}
