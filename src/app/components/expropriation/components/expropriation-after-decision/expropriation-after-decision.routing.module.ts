import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExpropriationAfterDecisionGuard } from './shared/expropriation-after-decision.guard';
import { ExpropriationAfterDecisionNewComponent } from './expropriation-after-decision-new/expropriation-after-decision-new.component';
import { ExpropriationAfterDecisionEditComponent } from './expropriation-after-decision-edit/expropriation-after-decision-edit.component';
import { ExpropriationAfterDecisionListComponent } from './expropriation-after-decision-list/expropriation-after-decision-list.component';
import { ExpropriationAfterDecisionViewComponent } from './expropriation-after-decision-view/expropriation-after-decision-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExpropriationAfterDecisionListComponent,
    canActivate: [ExpropriationAfterDecisionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExpropriationAfterDecisionNewComponent,
    canActivate: [ExpropriationAfterDecisionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExpropriationAfterDecisionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExpropriationAfterDecisionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExpropriationAfterDecisionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExpropriationAfterDecisionRoutingModule {
}
