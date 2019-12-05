import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AgendaExternalGuard } from './shared/agenda-external.guard';
import { AgendaExternalNewComponent } from './agenda-external-new/agenda-external-new.component';
import { AgendaExternalEditComponent } from './agenda-external-edit/agenda-external-edit.component';
import { AgendaExternalListComponent } from './agenda-external-list/agenda-external-list.component';
import { AgendaExternalViewComponent } from './agenda-external-view/agenda-external-view.component';

const routes: Routes = [
  {
    path: '',
    component: AgendaExternalListComponent,
    canActivate: [AgendaExternalGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AgendaExternalNewComponent,
    canActivate: [AgendaExternalGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AgendaExternalEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AgendaExternalListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AgendaExternalViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AgendaExternalRoutingModule {
}
