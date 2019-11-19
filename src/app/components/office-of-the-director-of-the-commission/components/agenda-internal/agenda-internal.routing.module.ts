import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AgendaInternalGuard } from './shared/agenda-internal.guard';
import { AgendaInternalNewComponent } from './agenda-internal-new/agenda-internal-new.component';
import { AgendaInternalEditComponent } from './agenda-internal-edit/agenda-internal-edit.component';
import { AgendaInternalListComponent } from './agenda-internal-list/agenda-internal-list.component';
import { AgendaInternalViewComponent } from './agenda-internal-view/agenda-internal-view.component';

const routes: Routes = [
  {
    path: '',
    component: AgendaInternalListComponent,
    canActivate: [AgendaInternalGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AgendaInternalNewComponent,
    canActivate: [AgendaInternalGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AgendaInternalEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AgendaInternalListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AgendaInternalViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AgendaInternalRoutingModule {
}
