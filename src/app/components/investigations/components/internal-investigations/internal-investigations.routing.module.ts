import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InternalInvestigationsGuard } from './shared/internal-investigations.guard';
import { InternalInvestigationsNewComponent } from './internal-investigations-new/internal-investigations-new.component';
import { InternalInvestigationsEditComponent } from './internal-investigations-edit/internal-investigations-edit.component';
import { InternalInvestigationsListComponent } from './internal-investigations-list/internal-investigations-list.component';
import { InternalInvestigationsViewComponent } from './internal-investigations-view/internal-investigations-view.component';

const routes: Routes = [
  {
    path: '',
    component: InternalInvestigationsListComponent,
    canActivate: [InternalInvestigationsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: InternalInvestigationsNewComponent,
    canActivate: [InternalInvestigationsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: InternalInvestigationsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: InternalInvestigationsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: InternalInvestigationsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InternalInvestigationsRoutingModule {
}
