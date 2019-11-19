import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExpropriationBeforeDecisionGuard } from './shared/expropriation-before-decision.guard';
import { ExpropriationBeforeDecisionNewComponent } from './expropriation-before-decision-new/expropriation-before-decision-new.component';
import { ExpropriationBeforeDecisionEditComponent } from './expropriation-before-decision-edit/expropriation-before-decision-edit.component';
import { ExpropriationBeforeDecisionListComponent } from './expropriation-before-decision-list/expropriation-before-decision-list.component';
import { ExpropriationBeforeDecisionViewComponent } from './expropriation-before-decision-view/expropriation-before-decision-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExpropriationBeforeDecisionListComponent,
    canActivate: [ExpropriationBeforeDecisionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExpropriationBeforeDecisionNewComponent,
    canActivate: [ExpropriationBeforeDecisionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExpropriationBeforeDecisionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExpropriationBeforeDecisionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExpropriationBeforeDecisionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExpropriationBeforeDecisionRoutingModule {
}
