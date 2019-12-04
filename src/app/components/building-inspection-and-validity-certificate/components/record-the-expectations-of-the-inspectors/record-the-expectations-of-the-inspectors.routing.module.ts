import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordTheExpectationsOfTheInspectorsGuard } from './shared/record-the-expectations-of-the-inspectors.guard';
import { RecordTheExpectationsOfTheInspectorsNewComponent } from './record-the-expectations-of-the-inspectors-new/record-the-expectations-of-the-inspectors-new.component';
import { RecordTheExpectationsOfTheInspectorsEditComponent } from './record-the-expectations-of-the-inspectors-edit/record-the-expectations-of-the-inspectors-edit.component';
import { RecordTheExpectationsOfTheInspectorsListComponent } from './record-the-expectations-of-the-inspectors-list/record-the-expectations-of-the-inspectors-list.component';
import { RecordTheExpectationsOfTheInspectorsViewComponent } from './record-the-expectations-of-the-inspectors-view/record-the-expectations-of-the-inspectors-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordTheExpectationsOfTheInspectorsListComponent,
    canActivate: [RecordTheExpectationsOfTheInspectorsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordTheExpectationsOfTheInspectorsNewComponent,
    canActivate: [RecordTheExpectationsOfTheInspectorsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordTheExpectationsOfTheInspectorsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordTheExpectationsOfTheInspectorsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordTheExpectationsOfTheInspectorsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordTheExpectationsOfTheInspectorsRoutingModule {
}
