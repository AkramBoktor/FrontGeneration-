import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ModifyThePricesOfSchoolsForPricing2018Guard } from './shared/modify-the-prices-of-schools-for-pricing-2018.guard';
import { ModifyThePricesOfSchoolsForPricing2018NewComponent } from './modify-the-prices-of-schools-for-pricing-2018-new/modify-the-prices-of-schools-for-pricing-2018-new.component';
import { ModifyThePricesOfSchoolsForPricing2018EditComponent } from './modify-the-prices-of-schools-for-pricing-2018-edit/modify-the-prices-of-schools-for-pricing-2018-edit.component';
import { ModifyThePricesOfSchoolsForPricing2018ListComponent } from './modify-the-prices-of-schools-for-pricing-2018-list/modify-the-prices-of-schools-for-pricing-2018-list.component';
import { ModifyThePricesOfSchoolsForPricing2018ViewComponent } from './modify-the-prices-of-schools-for-pricing-2018-view/modify-the-prices-of-schools-for-pricing-2018-view.component';

const routes: Routes = [
  {
    path: '',
    component: ModifyThePricesOfSchoolsForPricing2018ListComponent,
    canActivate: [ModifyThePricesOfSchoolsForPricing2018Guard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ModifyThePricesOfSchoolsForPricing2018NewComponent,
    canActivate: [ModifyThePricesOfSchoolsForPricing2018Guard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ModifyThePricesOfSchoolsForPricing2018EditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ModifyThePricesOfSchoolsForPricing2018ListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ModifyThePricesOfSchoolsForPricing2018ViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ModifyThePricesOfSchoolsForPricing2018RoutingModule {
}
