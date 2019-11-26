import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EnterTheTelephoneBillGuard } from './shared/enter-the-telephone-bill.guard';
import { EnterTheTelephoneBillNewComponent } from './enter-the-telephone-bill-new/enter-the-telephone-bill-new.component';
import { EnterTheTelephoneBillEditComponent } from './enter-the-telephone-bill-edit/enter-the-telephone-bill-edit.component';
import { EnterTheTelephoneBillListComponent } from './enter-the-telephone-bill-list/enter-the-telephone-bill-list.component';
import { EnterTheTelephoneBillViewComponent } from './enter-the-telephone-bill-view/enter-the-telephone-bill-view.component';

const routes: Routes = [
  {
    path: '',
    component: EnterTheTelephoneBillListComponent,
    canActivate: [EnterTheTelephoneBillGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EnterTheTelephoneBillNewComponent,
    canActivate: [EnterTheTelephoneBillGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EnterTheTelephoneBillEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EnterTheTelephoneBillListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EnterTheTelephoneBillViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EnterTheTelephoneBillRoutingModule {
}
