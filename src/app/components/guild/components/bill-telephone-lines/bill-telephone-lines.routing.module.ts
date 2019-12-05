import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BillTelephoneLinesGuard } from './shared/bill-telephone-lines.guard';
import { BillTelephoneLinesNewComponent } from './bill-telephone-lines-new/bill-telephone-lines-new.component';
import { BillTelephoneLinesEditComponent } from './bill-telephone-lines-edit/bill-telephone-lines-edit.component';
import { BillTelephoneLinesListComponent } from './bill-telephone-lines-list/bill-telephone-lines-list.component';
import { BillTelephoneLinesViewComponent } from './bill-telephone-lines-view/bill-telephone-lines-view.component';

const routes: Routes = [
  {
    path: '',
    component: BillTelephoneLinesListComponent,
    canActivate: [BillTelephoneLinesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BillTelephoneLinesNewComponent,
    canActivate: [BillTelephoneLinesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BillTelephoneLinesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BillTelephoneLinesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BillTelephoneLinesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BillTelephoneLinesRoutingModule {
}
