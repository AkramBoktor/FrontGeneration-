import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FeedingHourGuard } from './shared/feeding-hour.guard';
import { FeedingHourNewComponent } from './feeding-hour-new/feeding-hour-new.component';
import { FeedingHourEditComponent } from './feeding-hour-edit/feeding-hour-edit.component';
import { FeedingHourListComponent } from './feeding-hour-list/feeding-hour-list.component';
import { FeedingHourViewComponent } from './feeding-hour-view/feeding-hour-view.component';

const routes: Routes = [
  {
    path: '',
    component: FeedingHourListComponent,
    canActivate: [FeedingHourGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FeedingHourNewComponent,
    canActivate: [FeedingHourGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FeedingHourEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FeedingHourListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FeedingHourViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FeedingHourRoutingModule {
}
