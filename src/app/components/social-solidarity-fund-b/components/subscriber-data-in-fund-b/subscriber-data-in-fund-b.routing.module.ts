import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscriberDataInFundBGuard } from './shared/subscriber-data-in-fund-b.guard';
import { SubscriberDataInFundBNewComponent } from './subscriber-data-in-fund-b-new/subscriber-data-in-fund-b-new.component';
import { SubscriberDataInFundBEditComponent } from './subscriber-data-in-fund-b-edit/subscriber-data-in-fund-b-edit.component';
import { SubscriberDataInFundBListComponent } from './subscriber-data-in-fund-b-list/subscriber-data-in-fund-b-list.component';
import { SubscriberDataInFundBViewComponent } from './subscriber-data-in-fund-b-view/subscriber-data-in-fund-b-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriberDataInFundBListComponent,
    canActivate: [SubscriberDataInFundBGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscriberDataInFundBNewComponent,
    canActivate: [SubscriberDataInFundBGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscriberDataInFundBEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscriberDataInFundBListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscriberDataInFundBViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscriberDataInFundBRoutingModule {
}
