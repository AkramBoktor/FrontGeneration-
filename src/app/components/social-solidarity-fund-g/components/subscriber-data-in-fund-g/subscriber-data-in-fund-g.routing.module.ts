import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscriberDataInFundGGuard } from './shared/subscriber-data-in-fund-g.guard';
import { SubscriberDataInFundGNewComponent } from './subscriber-data-in-fund-g-new/subscriber-data-in-fund-g-new.component';
import { SubscriberDataInFundGEditComponent } from './subscriber-data-in-fund-g-edit/subscriber-data-in-fund-g-edit.component';
import { SubscriberDataInFundGListComponent } from './subscriber-data-in-fund-g-list/subscriber-data-in-fund-g-list.component';
import { SubscriberDataInFundGViewComponent } from './subscriber-data-in-fund-g-view/subscriber-data-in-fund-g-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriberDataInFundGListComponent,
    canActivate: [SubscriberDataInFundGGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscriberDataInFundGNewComponent,
    canActivate: [SubscriberDataInFundGGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscriberDataInFundGEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscriberDataInFundGListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscriberDataInFundGViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscriberDataInFundGRoutingModule {
}
