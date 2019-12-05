import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TimetableGuard } from './shared/timetable.guard';
import { TimetableNewComponent } from './timetable-new/timetable-new.component';
import { TimetableEditComponent } from './timetable-edit/timetable-edit.component';
import { TimetableListComponent } from './timetable-list/timetable-list.component';
import { TimetableViewComponent } from './timetable-view/timetable-view.component';

const routes: Routes = [
  {
    path: '',
    component: TimetableListComponent,
    canActivate: [TimetableGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TimetableNewComponent,
    canActivate: [TimetableGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TimetableEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TimetableListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TimetableViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TimetableRoutingModule {
}
