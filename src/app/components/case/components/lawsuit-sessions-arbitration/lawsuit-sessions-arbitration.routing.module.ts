import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawsuitSessionsArbitrationEditComponent } from './lawsuit-sessions-arbitration-edit/lawsuit-sessions-arbitration-edit.component';
import { LawsuitSessionsArbitrationListComponent } from './lawsuit-sessions-arbitration-list/lawsuit-sessions-arbitration-list.component';
import { LawsuitSessionsArbitrationNewComponent } from './lawsuit-sessions-arbitration-new/lawsuit-sessions-arbitration-new.component';
import { LawsuitSessionsArbitrationViewComponent } from './lawsuit-sessions-arbitration-view/lawsuit-sessions-arbitration-view.component';
import { LawsuitSessionsArbitrationGuard } from './shared/lawsuit-sessions-arbitration.guard';

const routes: Routes = [
  {
    path: '',
    component: LawsuitSessionsArbitrationListComponent,
    canActivate: [LawsuitSessionsArbitrationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LawsuitSessionsArbitrationNewComponent,
    canActivate: [LawsuitSessionsArbitrationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LawsuitSessionsArbitrationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LawsuitSessionsArbitrationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LawsuitSessionsArbitrationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LawsuitSessionsArbitrationRoutingModule {
}
