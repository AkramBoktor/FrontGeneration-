import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExternalInvestigationsGuard } from './shared/external-investigations.guard';
import { ExternalInvestigationsNewComponent } from './external-investigations-new/external-investigations-new.component';
import { ExternalInvestigationsEditComponent } from './external-investigations-edit/external-investigations-edit.component';
import { ExternalInvestigationsListComponent } from './external-investigations-list/external-investigations-list.component';
import { ExternalInvestigationsViewComponent } from './external-investigations-view/external-investigations-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalInvestigationsListComponent,
    canActivate: [ExternalInvestigationsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExternalInvestigationsNewComponent,
    canActivate: [ExternalInvestigationsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExternalInvestigationsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExternalInvestigationsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExternalInvestigationsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExternalInvestigationsRoutingModule {
}
