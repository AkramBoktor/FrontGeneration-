import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordingCorrectionOfPayGuard } from './shared/recording-correction-of-pay.guard';
import { RecordingCorrectionOfPayNewComponent } from './recording-correction-of-pay-new/recording-correction-of-pay-new.component';
import { RecordingCorrectionOfPayEditComponent } from './recording-correction-of-pay-edit/recording-correction-of-pay-edit.component';
import { RecordingCorrectionOfPayListComponent } from './recording-correction-of-pay-list/recording-correction-of-pay-list.component';
import { RecordingCorrectionOfPayViewComponent } from './recording-correction-of-pay-view/recording-correction-of-pay-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordingCorrectionOfPayListComponent,
    canActivate: [RecordingCorrectionOfPayGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordingCorrectionOfPayNewComponent,
    canActivate: [RecordingCorrectionOfPayGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordingCorrectionOfPayEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordingCorrectionOfPayListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordingCorrectionOfPayViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordingCorrectionOfPayRoutingModule {
}
