import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GateGuard } from './shared/gate.guard';
import { GateNewComponent } from './gate-new/gate-new.component';
import { GateEditComponent } from './gate-edit/gate-edit.component';
import { GateListComponent } from './gate-list/gate-list.component';
import { GateViewComponent } from './gate-view/gate-view.component';

const routes: Routes = [
  {
    path: '',
    component: GateListComponent,
    canActivate: [GateGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GateNewComponent,
    canActivate: [GateGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GateEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GateListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GateViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GateRoutingModule {
}
