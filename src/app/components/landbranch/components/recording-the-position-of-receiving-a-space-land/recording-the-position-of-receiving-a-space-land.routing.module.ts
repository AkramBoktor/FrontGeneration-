import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordingThePositionOfReceivingASpaceLandGuard } from './shared/recording-the-position-of-receiving-a-space-land.guard';
import { RecordingThePositionOfReceivingASpaceLandNewComponent } from './recording-the-position-of-receiving-a-space-land-new/recording-the-position-of-receiving-a-space-land-new.component';
import { RecordingThePositionOfReceivingASpaceLandEditComponent } from './recording-the-position-of-receiving-a-space-land-edit/recording-the-position-of-receiving-a-space-land-edit.component';
import { RecordingThePositionOfReceivingASpaceLandListComponent } from './recording-the-position-of-receiving-a-space-land-list/recording-the-position-of-receiving-a-space-land-list.component';
import { RecordingThePositionOfReceivingASpaceLandViewComponent } from './recording-the-position-of-receiving-a-space-land-view/recording-the-position-of-receiving-a-space-land-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordingThePositionOfReceivingASpaceLandListComponent,
    canActivate: [RecordingThePositionOfReceivingASpaceLandGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordingThePositionOfReceivingASpaceLandNewComponent,
    canActivate: [RecordingThePositionOfReceivingASpaceLandGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordingThePositionOfReceivingASpaceLandEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordingThePositionOfReceivingASpaceLandListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordingThePositionOfReceivingASpaceLandViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordingThePositionOfReceivingASpaceLandRoutingModule {
}
