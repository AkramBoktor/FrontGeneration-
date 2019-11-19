import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CanceledTenderGuard } from './shared/canceled-tender.guard';
import { CanceledTenderNewComponent } from './canceled-tender-new/canceled-tender-new.component';
import { CanceledTenderEditComponent } from './canceled-tender-edit/canceled-tender-edit.component';
import { CanceledTenderListComponent } from './canceled-tender-list/canceled-tender-list.component';
import { CanceledTenderViewComponent } from './canceled-tender-view/canceled-tender-view.component';

const routes: Routes = [
  {
    path: '',
    component: CanceledTenderListComponent,
    canActivate: [CanceledTenderGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CanceledTenderNewComponent,
    canActivate: [CanceledTenderGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CanceledTenderEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CanceledTenderListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CanceledTenderViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CanceledTenderRoutingModule {
}
