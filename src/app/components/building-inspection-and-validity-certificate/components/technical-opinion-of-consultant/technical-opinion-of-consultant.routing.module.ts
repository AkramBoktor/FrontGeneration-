import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TechnicalOpinionOfConsultantGuard } from './shared/technical-opinion-of-consultant.guard';
import { TechnicalOpinionOfConsultantNewComponent } from './technical-opinion-of-consultant-new/technical-opinion-of-consultant-new.component';
import { TechnicalOpinionOfConsultantEditComponent } from './technical-opinion-of-consultant-edit/technical-opinion-of-consultant-edit.component';
import { TechnicalOpinionOfConsultantListComponent } from './technical-opinion-of-consultant-list/technical-opinion-of-consultant-list.component';
import { TechnicalOpinionOfConsultantViewComponent } from './technical-opinion-of-consultant-view/technical-opinion-of-consultant-view.component';

const routes: Routes = [
  {
    path: '',
    component: TechnicalOpinionOfConsultantListComponent,
    canActivate: [TechnicalOpinionOfConsultantGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TechnicalOpinionOfConsultantNewComponent,
    canActivate: [TechnicalOpinionOfConsultantGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TechnicalOpinionOfConsultantEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TechnicalOpinionOfConsultantListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TechnicalOpinionOfConsultantViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TechnicalOpinionOfConsultantRoutingModule {
}
