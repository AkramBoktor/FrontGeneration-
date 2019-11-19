import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncentiveBonusEditComponent } from './incentive-bonus-edit/incentive-bonus-edit.component';
import { IncentiveBonusListComponent } from './incentive-bonus-list/incentive-bonus-list.component';
import { IncentiveBonusNewComponent } from './incentive-bonus-new/incentive-bonus-new.component';
import { IncentiveBonusViewComponent } from './incentive-bonus-view/incentive-bonus-view.component';
import { IncentiveBonusGuard } from './shared/incentive-bonus.guard';

const routes: Routes = [
  {
    path: '',
    component: IncentiveBonusListComponent,
    canActivate: [IncentiveBonusGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: IncentiveBonusNewComponent,
    canActivate: [IncentiveBonusGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: IncentiveBonusEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: IncentiveBonusListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: IncentiveBonusViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class IncentiveBonusRoutingModule {
}
