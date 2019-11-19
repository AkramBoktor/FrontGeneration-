import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExpropriationDataAfterThePrimeMinisterDecisionGuard } from './shared/expropriation-data-after-the-prime-minister-decision.guard';
import { ExpropriationDataAfterThePrimeMinisterDecisionNewComponent } from './expropriation-data-after-the-prime-minister-decision-new/expropriation-data-after-the-prime-minister-decision-new.component';
import { ExpropriationDataAfterThePrimeMinisterDecisionEditComponent } from './expropriation-data-after-the-prime-minister-decision-edit/expropriation-data-after-the-prime-minister-decision-edit.component';
import { ExpropriationDataAfterThePrimeMinisterDecisionListComponent } from './expropriation-data-after-the-prime-minister-decision-list/expropriation-data-after-the-prime-minister-decision-list.component';
import { ExpropriationDataAfterThePrimeMinisterDecisionViewComponent } from './expropriation-data-after-the-prime-minister-decision-view/expropriation-data-after-the-prime-minister-decision-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExpropriationDataAfterThePrimeMinisterDecisionListComponent,
    canActivate: [ExpropriationDataAfterThePrimeMinisterDecisionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExpropriationDataAfterThePrimeMinisterDecisionNewComponent,
    canActivate: [ExpropriationDataAfterThePrimeMinisterDecisionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExpropriationDataAfterThePrimeMinisterDecisionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExpropriationDataAfterThePrimeMinisterDecisionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExpropriationDataAfterThePrimeMinisterDecisionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExpropriationDataAfterThePrimeMinisterDecisionRoutingModule {
}
