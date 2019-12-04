import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ElectricityWorksGuard } from './shared/electricity-works.guard';
import { ElectricityWorksNewComponent } from './electricity-works-new/electricity-works-new.component';
import { ElectricityWorksEditComponent } from './electricity-works-edit/electricity-works-edit.component';
import { ElectricityWorksListComponent } from './electricity-works-list/electricity-works-list.component';
import { ElectricityWorksViewComponent } from './electricity-works-view/electricity-works-view.component';

const routes: Routes = [
  {
    path: '',
    component: ElectricityWorksListComponent,
    canActivate: [ElectricityWorksGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ElectricityWorksNewComponent,
    canActivate: [ElectricityWorksGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ElectricityWorksEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ElectricityWorksListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ElectricityWorksViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ElectricityWorksRoutingModule {
}
