import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TotalOutgoingGuard } from './shared/total-outgoing.guard';
import { TotalOutgoingNewComponent } from './total-outgoing-new/total-outgoing-new.component';
import { TotalOutgoingEditComponent } from './total-outgoing-edit/total-outgoing-edit.component';
import { TotalOutgoingListComponent } from './total-outgoing-list/total-outgoing-list.component';
import { TotalOutgoingViewComponent } from './total-outgoing-view/total-outgoing-view.component';

const routes: Routes = [
  {
    path: '',
    component: TotalOutgoingListComponent,
    canActivate: [TotalOutgoingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TotalOutgoingNewComponent,
    canActivate: [TotalOutgoingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TotalOutgoingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TotalOutgoingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TotalOutgoingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TotalOutgoingRoutingModule {
}
