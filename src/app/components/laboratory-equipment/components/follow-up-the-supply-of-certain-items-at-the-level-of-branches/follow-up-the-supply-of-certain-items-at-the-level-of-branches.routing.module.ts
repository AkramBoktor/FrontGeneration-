import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesGuard } from './shared/follow-up-the-supply-of-certain-items-at-the-level-of-branches.guard';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesNewComponent } from './follow-up-the-supply-of-certain-items-at-the-level-of-branches-new/follow-up-the-supply-of-certain-items-at-the-level-of-branches-new.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesEditComponent } from './follow-up-the-supply-of-certain-items-at-the-level-of-branches-edit/follow-up-the-supply-of-certain-items-at-the-level-of-branches-edit.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesListComponent } from './follow-up-the-supply-of-certain-items-at-the-level-of-branches-list/follow-up-the-supply-of-certain-items-at-the-level-of-branches-list.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesViewComponent } from './follow-up-the-supply-of-certain-items-at-the-level-of-branches-view/follow-up-the-supply-of-certain-items-at-the-level-of-branches-view.component';

const routes: Routes = [
  {
    path: '',
    component: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesListComponent,
    canActivate: [FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesNewComponent,
    canActivate: [FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesRoutingModule {
}
