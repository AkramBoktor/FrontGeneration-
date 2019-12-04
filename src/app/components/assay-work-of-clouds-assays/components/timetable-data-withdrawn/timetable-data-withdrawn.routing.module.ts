import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TimetableDataWithdrawnGuard } from './shared/timetable-data-withdrawn.guard';
import { TimetableDataWithdrawnNewComponent } from './timetable-data-withdrawn-new/timetable-data-withdrawn-new.component';
import { TimetableDataWithdrawnEditComponent } from './timetable-data-withdrawn-edit/timetable-data-withdrawn-edit.component';
import { TimetableDataWithdrawnListComponent } from './timetable-data-withdrawn-list/timetable-data-withdrawn-list.component';
import { TimetableDataWithdrawnViewComponent } from './timetable-data-withdrawn-view/timetable-data-withdrawn-view.component';

const routes: Routes = [
  {
    path: '',
    component: TimetableDataWithdrawnListComponent,
    canActivate: [TimetableDataWithdrawnGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TimetableDataWithdrawnNewComponent,
    canActivate: [TimetableDataWithdrawnGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TimetableDataWithdrawnEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TimetableDataWithdrawnListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TimetableDataWithdrawnViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TimetableDataWithdrawnRoutingModule {
}
