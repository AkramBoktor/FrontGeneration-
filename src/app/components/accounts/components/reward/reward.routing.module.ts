import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RewardGuard } from './shared/reward.guard';
import { RewardNewComponent } from './reward-new/reward-new.component';
import { RewardEditComponent } from './reward-edit/reward-edit.component';
import { RewardListComponent } from './reward-list/reward-list.component';
import { RewardViewComponent } from './reward-view/reward-view.component';

const routes: Routes = [
  {
    path: '',
    component: RewardListComponent,
    canActivate: [RewardGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RewardNewComponent,
    canActivate: [RewardGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RewardEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RewardListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RewardViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RewardRoutingModule {
}
