import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordThePositionOfNeedToBeRemovedGuard } from './shared/record-the-position-of-need-to-be-removed.guard';
import { RecordThePositionOfNeedToBeRemovedNewComponent } from './record-the-position-of-need-to-be-removed-new/record-the-position-of-need-to-be-removed-new.component';
import { RecordThePositionOfNeedToBeRemovedEditComponent } from './record-the-position-of-need-to-be-removed-edit/record-the-position-of-need-to-be-removed-edit.component';
import { RecordThePositionOfNeedToBeRemovedListComponent } from './record-the-position-of-need-to-be-removed-list/record-the-position-of-need-to-be-removed-list.component';
import { RecordThePositionOfNeedToBeRemovedViewComponent } from './record-the-position-of-need-to-be-removed-view/record-the-position-of-need-to-be-removed-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordThePositionOfNeedToBeRemovedListComponent,
    canActivate: [RecordThePositionOfNeedToBeRemovedGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordThePositionOfNeedToBeRemovedNewComponent,
    canActivate: [RecordThePositionOfNeedToBeRemovedGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordThePositionOfNeedToBeRemovedEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordThePositionOfNeedToBeRemovedListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordThePositionOfNeedToBeRemovedViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordThePositionOfNeedToBeRemovedRoutingModule {
}
