import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscriptionValueByAgeGGuard } from './shared/subscription-value-by-age-g.guard';
import { SubscriptionValueByAgeGNewComponent } from './subscription-value-by-age-g-new/subscription-value-by-age-g-new.component';
import { SubscriptionValueByAgeGEditComponent } from './subscription-value-by-age-g-edit/subscription-value-by-age-g-edit.component';
import { SubscriptionValueByAgeGListComponent } from './subscription-value-by-age-g-list/subscription-value-by-age-g-list.component';
import { SubscriptionValueByAgeGViewComponent } from './subscription-value-by-age-g-view/subscription-value-by-age-g-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionValueByAgeGListComponent,
    canActivate: [SubscriptionValueByAgeGGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscriptionValueByAgeGNewComponent,
    canActivate: [SubscriptionValueByAgeGGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscriptionValueByAgeGEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscriptionValueByAgeGListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscriptionValueByAgeGViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscriptionValueByAgeGRoutingModule {
}
