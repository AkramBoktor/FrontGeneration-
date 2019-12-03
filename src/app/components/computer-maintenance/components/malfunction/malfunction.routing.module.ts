import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MalfunctionGuard } from './shared/malfunction.guard';
import { MalfunctionNewComponent } from './malfunction-new/malfunction-new.component';
import { MalfunctionEditComponent } from './malfunction-edit/malfunction-edit.component';
import { MalfunctionListComponent } from './malfunction-list/malfunction-list.component';
import { MalfunctionViewComponent } from './malfunction-view/malfunction-view.component';

const routes: Routes = [
  {
    path: '',
    component: MalfunctionListComponent,
    canActivate: [MalfunctionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MalfunctionNewComponent,
    canActivate: [MalfunctionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MalfunctionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MalfunctionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MalfunctionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MalfunctionRoutingModule {
}
