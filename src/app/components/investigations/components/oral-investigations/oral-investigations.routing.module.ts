import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { OralInvestigationsGuard } from './shared/oral-investigations.guard';
import { OralInvestigationsNewComponent } from './oral-investigations-new/oral-investigations-new.component';
import { OralInvestigationsEditComponent } from './oral-investigations-edit/oral-investigations-edit.component';
import { OralInvestigationsListComponent } from './oral-investigations-list/oral-investigations-list.component';
import { OralInvestigationsViewComponent } from './oral-investigations-view/oral-investigations-view.component';

const routes: Routes = [
  {
    path: '',
    component: OralInvestigationsListComponent,
    canActivate: [OralInvestigationsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: OralInvestigationsNewComponent,
    canActivate: [OralInvestigationsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: OralInvestigationsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: OralInvestigationsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: OralInvestigationsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class OralInvestigationsRoutingModule {
}
