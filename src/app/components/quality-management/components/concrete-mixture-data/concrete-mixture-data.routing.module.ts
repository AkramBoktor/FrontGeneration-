import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ConcreteMixtureDataGuard } from './shared/concrete-mixture-data.guard';
import { ConcreteMixtureDataNewComponent } from './concrete-mixture-data-new/concrete-mixture-data-new.component';
import { ConcreteMixtureDataEditComponent } from './concrete-mixture-data-edit/concrete-mixture-data-edit.component';
import { ConcreteMixtureDataListComponent } from './concrete-mixture-data-list/concrete-mixture-data-list.component';
import { ConcreteMixtureDataViewComponent } from './concrete-mixture-data-view/concrete-mixture-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: ConcreteMixtureDataListComponent,
    canActivate: [ConcreteMixtureDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ConcreteMixtureDataNewComponent,
    canActivate: [ConcreteMixtureDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ConcreteMixtureDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ConcreteMixtureDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ConcreteMixtureDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ConcreteMixtureDataRoutingModule {
}
