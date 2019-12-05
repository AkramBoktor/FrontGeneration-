import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CommitteesFormationDataGuard } from './shared/committees-formation-data.guard';
import { CommitteesFormationDataNewComponent } from './committees-formation-data-new/committees-formation-data-new.component';
import { CommitteesFormationDataEditComponent } from './committees-formation-data-edit/committees-formation-data-edit.component';
import { CommitteesFormationDataListComponent } from './committees-formation-data-list/committees-formation-data-list.component';
import { CommitteesFormationDataViewComponent } from './committees-formation-data-view/committees-formation-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: CommitteesFormationDataListComponent,
    canActivate: [CommitteesFormationDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CommitteesFormationDataNewComponent,
    canActivate: [CommitteesFormationDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CommitteesFormationDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CommitteesFormationDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CommitteesFormationDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CommitteesFormationDataRoutingModule {
}
