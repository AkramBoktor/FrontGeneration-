import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AccreditationGuard } from './shared/accreditation.guard';
import { AccreditationNewComponent } from './accreditation-new/accreditation-new.component';
import { AccreditationEditComponent } from './accreditation-edit/accreditation-edit.component';
import { AccreditationListComponent } from './accreditation-list/accreditation-list.component';
import { AccreditationViewComponent } from './accreditation-view/accreditation-view.component';

const routes: Routes = [
  {
    path: '',
    component: AccreditationListComponent,
    canActivate: [AccreditationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AccreditationNewComponent,
    canActivate: [AccreditationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AccreditationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AccreditationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AccreditationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AccreditationRoutingModule {
}
