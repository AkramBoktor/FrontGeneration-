import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ModifyThePricesOfSchoolsForPricing2018ListComponent } from './modify-the-prices-of-schools-for-pricing-2018-list/modify-the-prices-of-schools-for-pricing-2018-list.component';
import { ModifyThePricesOfSchoolsForPricing2018EditComponent } from './modify-the-prices-of-schools-for-pricing-2018-edit/modify-the-prices-of-schools-for-pricing-2018-edit.component';
import { ModifyThePricesOfSchoolsForPricing2018NewComponent } from './modify-the-prices-of-schools-for-pricing-2018-new/modify-the-prices-of-schools-for-pricing-2018-new.component';
import { ModifyThePricesOfSchoolsForPricing2018ViewComponent } from './modify-the-prices-of-schools-for-pricing-2018-view/modify-the-prices-of-schools-for-pricing-2018-view.component';
import { ModifyThePricesOfSchoolsForPricing2018RoutingModule } from './modify-the-prices-of-schools-for-pricing-2018.routing.module';
import { ModifyThePricesOfSchoolsForPricing2018Service } from './shared/modify-the-prices-of-schools-for-pricing-2018.service';
import { ModifyThePricesOfSchoolsForPricing2018Guard } from './shared/modify-the-prices-of-schools-for-pricing-2018.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ModifyThePricesOfSchoolsForPricing2018ListComponent,
    ModifyThePricesOfSchoolsForPricing2018NewComponent,
    ModifyThePricesOfSchoolsForPricing2018EditComponent,
    ModifyThePricesOfSchoolsForPricing2018ViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ModifyThePricesOfSchoolsForPricing2018RoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ModifyThePricesOfSchoolsForPricing2018Service,
    ModifyThePricesOfSchoolsForPricing2018Guard
  ],
  entryComponents: [
    ModifyThePricesOfSchoolsForPricing2018NewComponent,
    ModifyThePricesOfSchoolsForPricing2018EditComponent,
    ModifyThePricesOfSchoolsForPricing2018ViewComponent
  ]
})

export class ModifyThePricesOfSchoolsForPricing2018Module {
}
