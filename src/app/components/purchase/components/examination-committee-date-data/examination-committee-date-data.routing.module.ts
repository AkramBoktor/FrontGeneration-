import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExaminationCommitteeDateDataGuard } from './shared/examination-committee-date-data.guard';
import { ExaminationCommitteeDateDataNewComponent } from './examination-committee-date-data-new/examination-committee-date-data-new.component';
import { ExaminationCommitteeDateDataEditComponent } from './examination-committee-date-data-edit/examination-committee-date-data-edit.component';
import { ExaminationCommitteeDateDataListComponent } from './examination-committee-date-data-list/examination-committee-date-data-list.component';
import { ExaminationCommitteeDateDataViewComponent } from './examination-committee-date-data-view/examination-committee-date-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationCommitteeDateDataListComponent,
    canActivate: [ExaminationCommitteeDateDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExaminationCommitteeDateDataNewComponent,
    canActivate: [ExaminationCommitteeDateDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExaminationCommitteeDateDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExaminationCommitteeDateDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExaminationCommitteeDateDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExaminationCommitteeDateDataRoutingModule {
}
