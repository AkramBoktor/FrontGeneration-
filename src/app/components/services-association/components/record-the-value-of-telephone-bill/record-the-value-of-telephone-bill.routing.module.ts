import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordTheValueOfTelephoneBillGuard } from './shared/record-the-value-of-telephone-bill.guard';
import { RecordTheValueOfTelephoneBillNewComponent } from './record-the-value-of-telephone-bill-new/record-the-value-of-telephone-bill-new.component';
import { RecordTheValueOfTelephoneBillEditComponent } from './record-the-value-of-telephone-bill-edit/record-the-value-of-telephone-bill-edit.component';
import { RecordTheValueOfTelephoneBillListComponent } from './record-the-value-of-telephone-bill-list/record-the-value-of-telephone-bill-list.component';
import { RecordTheValueOfTelephoneBillViewComponent } from './record-the-value-of-telephone-bill-view/record-the-value-of-telephone-bill-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordTheValueOfTelephoneBillListComponent,
    canActivate: [RecordTheValueOfTelephoneBillGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordTheValueOfTelephoneBillNewComponent,
    canActivate: [RecordTheValueOfTelephoneBillGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordTheValueOfTelephoneBillEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordTheValueOfTelephoneBillListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordTheValueOfTelephoneBillViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordTheValueOfTelephoneBillRoutingModule {
}
