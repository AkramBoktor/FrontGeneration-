import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscriptionValueByAgeAGuard } from './shared/subscription-value-by-age-a.guard';
import { SubscriptionValueByAgeANewComponent } from './subscription-value-by-age-a-new/subscription-value-by-age-a-new.component';
import { SubscriptionValueByAgeAEditComponent } from './subscription-value-by-age-a-edit/subscription-value-by-age-a-edit.component';
import { SubscriptionValueByAgeAListComponent } from './subscription-value-by-age-a-list/subscription-value-by-age-a-list.component';
import { SubscriptionValueByAgeAViewComponent } from './subscription-value-by-age-a-view/subscription-value-by-age-a-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionValueByAgeAListComponent,
    canActivate: [SubscriptionValueByAgeAGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscriptionValueByAgeANewComponent,
    canActivate: [SubscriptionValueByAgeAGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscriptionValueByAgeAEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscriptionValueByAgeAListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscriptionValueByAgeAViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscriptionValueByAgeARoutingModule {
}
