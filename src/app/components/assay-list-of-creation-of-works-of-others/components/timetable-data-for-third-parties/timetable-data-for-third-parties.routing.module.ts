import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TimetableDataForThirdPartiesGuard } from './shared/timetable-data-for-third-parties.guard';
import { TimetableDataForThirdPartiesNewComponent } from './timetable-data-for-third-parties-new/timetable-data-for-third-parties-new.component';
import { TimetableDataForThirdPartiesEditComponent } from './timetable-data-for-third-parties-edit/timetable-data-for-third-parties-edit.component';
import { TimetableDataForThirdPartiesListComponent } from './timetable-data-for-third-parties-list/timetable-data-for-third-parties-list.component';
import { TimetableDataForThirdPartiesViewComponent } from './timetable-data-for-third-parties-view/timetable-data-for-third-parties-view.component';

const routes: Routes = [
  {
    path: '',
    component: TimetableDataForThirdPartiesListComponent,
    canActivate: [TimetableDataForThirdPartiesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TimetableDataForThirdPartiesNewComponent,
    canActivate: [TimetableDataForThirdPartiesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TimetableDataForThirdPartiesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TimetableDataForThirdPartiesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TimetableDataForThirdPartiesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TimetableDataForThirdPartiesRoutingModule {
}
