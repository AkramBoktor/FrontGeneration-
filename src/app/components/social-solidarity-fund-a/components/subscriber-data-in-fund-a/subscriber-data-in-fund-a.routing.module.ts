import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscriberDataInFundAGuard } from './shared/subscriber-data-in-fund-a.guard';
import { SubscriberDataInFundANewComponent } from './subscriber-data-in-fund-a-new/subscriber-data-in-fund-a-new.component';
import { SubscriberDataInFundAEditComponent } from './subscriber-data-in-fund-a-edit/subscriber-data-in-fund-a-edit.component';
import { SubscriberDataInFundAListComponent } from './subscriber-data-in-fund-a-list/subscriber-data-in-fund-a-list.component';
import { SubscriberDataInFundAViewComponent } from './subscriber-data-in-fund-a-view/subscriber-data-in-fund-a-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriberDataInFundAListComponent,
    canActivate: [SubscriberDataInFundAGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscriberDataInFundANewComponent,
    canActivate: [SubscriberDataInFundAGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscriberDataInFundAEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscriberDataInFundAListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscriberDataInFundAViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscriberDataInFundARoutingModule {
}
