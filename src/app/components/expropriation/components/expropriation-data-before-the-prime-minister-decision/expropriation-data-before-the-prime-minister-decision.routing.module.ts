import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExpropriationDataBeforeThePrimeMinisterDecisionGuard } from './shared/expropriation-data-before-the-prime-minister-decision.guard';
import { ExpropriationDataBeforeThePrimeMinisterDecisionNewComponent } from './expropriation-data-before-the-prime-minister-decision-new/expropriation-data-before-the-prime-minister-decision-new.component';
import { ExpropriationDataBeforeThePrimeMinisterDecisionEditComponent } from './expropriation-data-before-the-prime-minister-decision-edit/expropriation-data-before-the-prime-minister-decision-edit.component';
import { ExpropriationDataBeforeThePrimeMinisterDecisionListComponent } from './expropriation-data-before-the-prime-minister-decision-list/expropriation-data-before-the-prime-minister-decision-list.component';
import { ExpropriationDataBeforeThePrimeMinisterDecisionViewComponent } from './expropriation-data-before-the-prime-minister-decision-view/expropriation-data-before-the-prime-minister-decision-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExpropriationDataBeforeThePrimeMinisterDecisionListComponent,
    canActivate: [ExpropriationDataBeforeThePrimeMinisterDecisionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExpropriationDataBeforeThePrimeMinisterDecisionNewComponent,
    canActivate: [ExpropriationDataBeforeThePrimeMinisterDecisionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExpropriationDataBeforeThePrimeMinisterDecisionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExpropriationDataBeforeThePrimeMinisterDecisionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExpropriationDataBeforeThePrimeMinisterDecisionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExpropriationDataBeforeThePrimeMinisterDecisionRoutingModule {
}
