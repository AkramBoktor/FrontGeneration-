import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MainDataForTheSampleGuard } from './shared/main-data-for-the-sample.guard';
import { MainDataForTheSampleNewComponent } from './main-data-for-the-sample-new/main-data-for-the-sample-new.component';
import { MainDataForTheSampleEditComponent } from './main-data-for-the-sample-edit/main-data-for-the-sample-edit.component';
import { MainDataForTheSampleListComponent } from './main-data-for-the-sample-list/main-data-for-the-sample-list.component';
import { MainDataForTheSampleViewComponent } from './main-data-for-the-sample-view/main-data-for-the-sample-view.component';

const routes: Routes = [
  {
    path: '',
    component: MainDataForTheSampleListComponent,
    canActivate: [MainDataForTheSampleGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MainDataForTheSampleNewComponent,
    canActivate: [MainDataForTheSampleGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MainDataForTheSampleEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MainDataForTheSampleListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MainDataForTheSampleViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MainDataForTheSampleRoutingModule {
}
