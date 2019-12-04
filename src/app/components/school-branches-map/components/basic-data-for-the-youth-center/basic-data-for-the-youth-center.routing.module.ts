import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BasicDataForTheYouthCenterGuard } from './shared/basic-data-for-the-youth-center.guard';
import { BasicDataForTheYouthCenterNewComponent } from './basic-data-for-the-youth-center-new/basic-data-for-the-youth-center-new.component';
import { BasicDataForTheYouthCenterEditComponent } from './basic-data-for-the-youth-center-edit/basic-data-for-the-youth-center-edit.component';
import { BasicDataForTheYouthCenterListComponent } from './basic-data-for-the-youth-center-list/basic-data-for-the-youth-center-list.component';
import { BasicDataForTheYouthCenterViewComponent } from './basic-data-for-the-youth-center-view/basic-data-for-the-youth-center-view.component';

const routes: Routes = [
  {
    path: '',
    component: BasicDataForTheYouthCenterListComponent,
    canActivate: [BasicDataForTheYouthCenterGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BasicDataForTheYouthCenterNewComponent,
    canActivate: [BasicDataForTheYouthCenterGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BasicDataForTheYouthCenterEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BasicDataForTheYouthCenterListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BasicDataForTheYouthCenterViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BasicDataForTheYouthCenterRoutingModule {
}
