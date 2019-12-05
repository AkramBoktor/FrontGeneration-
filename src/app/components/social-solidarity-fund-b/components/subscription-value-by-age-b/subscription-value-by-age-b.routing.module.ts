import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscriptionValueByAgeBGuard } from './shared/subscription-value-by-age-b.guard';
import { SubscriptionValueByAgeBNewComponent } from './subscription-value-by-age-b-new/subscription-value-by-age-b-new.component';
import { SubscriptionValueByAgeBEditComponent } from './subscription-value-by-age-b-edit/subscription-value-by-age-b-edit.component';
import { SubscriptionValueByAgeBListComponent } from './subscription-value-by-age-b-list/subscription-value-by-age-b-list.component';
import { SubscriptionValueByAgeBViewComponent } from './subscription-value-by-age-b-view/subscription-value-by-age-b-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionValueByAgeBListComponent,
    canActivate: [SubscriptionValueByAgeBGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscriptionValueByAgeBNewComponent,
    canActivate: [SubscriptionValueByAgeBGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscriptionValueByAgeBEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscriptionValueByAgeBListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscriptionValueByAgeBViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscriptionValueByAgeBRoutingModule {
}
