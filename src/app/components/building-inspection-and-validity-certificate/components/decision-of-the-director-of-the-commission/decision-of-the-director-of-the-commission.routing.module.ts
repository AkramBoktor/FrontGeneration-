import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DecisionOfTheDirectorOfTheCommissionGuard } from './shared/decision-of-the-director-of-the-commission.guard';
import { DecisionOfTheDirectorOfTheCommissionNewComponent } from './decision-of-the-director-of-the-commission-new/decision-of-the-director-of-the-commission-new.component';
import { DecisionOfTheDirectorOfTheCommissionEditComponent } from './decision-of-the-director-of-the-commission-edit/decision-of-the-director-of-the-commission-edit.component';
import { DecisionOfTheDirectorOfTheCommissionListComponent } from './decision-of-the-director-of-the-commission-list/decision-of-the-director-of-the-commission-list.component';
import { DecisionOfTheDirectorOfTheCommissionViewComponent } from './decision-of-the-director-of-the-commission-view/decision-of-the-director-of-the-commission-view.component';

const routes: Routes = [
  {
    path: '',
    component: DecisionOfTheDirectorOfTheCommissionListComponent,
    canActivate: [DecisionOfTheDirectorOfTheCommissionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DecisionOfTheDirectorOfTheCommissionNewComponent,
    canActivate: [DecisionOfTheDirectorOfTheCommissionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DecisionOfTheDirectorOfTheCommissionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DecisionOfTheDirectorOfTheCommissionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DecisionOfTheDirectorOfTheCommissionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DecisionOfTheDirectorOfTheCommissionRoutingModule {
}
