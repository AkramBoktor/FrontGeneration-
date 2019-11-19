import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BasicDataLoggingGuard } from './shared/basic-data-logging.guard';
import { BasicDataLoggingNewComponent } from './basic-data-logging-new/basic-data-logging-new.component';
import { BasicDataLoggingEditComponent } from './basic-data-logging-edit/basic-data-logging-edit.component';
import { BasicDataLoggingListComponent } from './basic-data-logging-list/basic-data-logging-list.component';
import { BasicDataLoggingViewComponent } from './basic-data-logging-view/basic-data-logging-view.component';

const routes: Routes = [
  {
    path: '',
    component: BasicDataLoggingListComponent,
    canActivate: [BasicDataLoggingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BasicDataLoggingNewComponent,
    canActivate: [BasicDataLoggingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BasicDataLoggingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BasicDataLoggingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BasicDataLoggingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BasicDataLoggingRoutingModule {
}
