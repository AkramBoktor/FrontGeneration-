import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ConcreteMixtureDataForTheWorkOfOthersGuard } from './shared/concrete-mixture-data-for-the-work-of-others.guard';
import { ConcreteMixtureDataForTheWorkOfOthersNewComponent } from './concrete-mixture-data-for-the-work-of-others-new/concrete-mixture-data-for-the-work-of-others-new.component';
import { ConcreteMixtureDataForTheWorkOfOthersEditComponent } from './concrete-mixture-data-for-the-work-of-others-edit/concrete-mixture-data-for-the-work-of-others-edit.component';
import { ConcreteMixtureDataForTheWorkOfOthersListComponent } from './concrete-mixture-data-for-the-work-of-others-list/concrete-mixture-data-for-the-work-of-others-list.component';
import { ConcreteMixtureDataForTheWorkOfOthersViewComponent } from './concrete-mixture-data-for-the-work-of-others-view/concrete-mixture-data-for-the-work-of-others-view.component';

const routes: Routes = [
  {
    path: '',
    component: ConcreteMixtureDataForTheWorkOfOthersListComponent,
    canActivate: [ConcreteMixtureDataForTheWorkOfOthersGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ConcreteMixtureDataForTheWorkOfOthersNewComponent,
    canActivate: [ConcreteMixtureDataForTheWorkOfOthersGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ConcreteMixtureDataForTheWorkOfOthersEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ConcreteMixtureDataForTheWorkOfOthersListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ConcreteMixtureDataForTheWorkOfOthersViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ConcreteMixtureDataForTheWorkOfOthersRoutingModule {
}
