import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TheMainRoadsGuard } from './shared/the-main-roads.guard';
import { TheMainRoadsNewComponent } from './the-main-roads-new/the-main-roads-new.component';
import { TheMainRoadsEditComponent } from './the-main-roads-edit/the-main-roads-edit.component';
import { TheMainRoadsListComponent } from './the-main-roads-list/the-main-roads-list.component';
import { TheMainRoadsViewComponent } from './the-main-roads-view/the-main-roads-view.component';

const routes: Routes = [
  {
    path: '',
    component: TheMainRoadsListComponent,
    canActivate: [TheMainRoadsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TheMainRoadsNewComponent,
    canActivate: [TheMainRoadsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TheMainRoadsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TheMainRoadsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TheMainRoadsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TheMainRoadsRoutingModule {
}
