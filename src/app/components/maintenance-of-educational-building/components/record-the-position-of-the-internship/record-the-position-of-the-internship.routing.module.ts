import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordThePositionOfTheInternshipGuard } from './shared/record-the-position-of-the-internship.guard';
import { RecordThePositionOfTheInternshipNewComponent } from './record-the-position-of-the-internship-new/record-the-position-of-the-internship-new.component';
import { RecordThePositionOfTheInternshipEditComponent } from './record-the-position-of-the-internship-edit/record-the-position-of-the-internship-edit.component';
import { RecordThePositionOfTheInternshipListComponent } from './record-the-position-of-the-internship-list/record-the-position-of-the-internship-list.component';
import { RecordThePositionOfTheInternshipViewComponent } from './record-the-position-of-the-internship-view/record-the-position-of-the-internship-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordThePositionOfTheInternshipListComponent,
    canActivate: [RecordThePositionOfTheInternshipGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordThePositionOfTheInternshipNewComponent,
    canActivate: [RecordThePositionOfTheInternshipGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordThePositionOfTheInternshipEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordThePositionOfTheInternshipListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordThePositionOfTheInternshipViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordThePositionOfTheInternshipRoutingModule {
}
