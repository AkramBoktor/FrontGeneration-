import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExternalServicesCodesAndCostListComponent } from './external-services-codes-and-cost-list/external-services-codes-and-cost-list.component';
import { ExternalServicesCodesAndCostEditComponent } from './external-services-codes-and-cost-edit/external-services-codes-and-cost-edit.component';
import { ExternalServicesCodesAndCostNewComponent } from './external-services-codes-and-cost-new/external-services-codes-and-cost-new.component';
import { ExternalServicesCodesAndCostViewComponent } from './external-services-codes-and-cost-view/external-services-codes-and-cost-view.component';
import { ExternalServicesCodesAndCostRoutingModule } from './external-services-codes-and-cost.routing.module';
import { ExternalServicesCodesAndCostService } from './shared/external-services-codes-and-cost.service';
import { ExternalServicesCodesAndCostGuard } from './shared/external-services-codes-and-cost.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExternalServicesCodesAndCostListComponent,
    ExternalServicesCodesAndCostNewComponent,
    ExternalServicesCodesAndCostEditComponent,
    ExternalServicesCodesAndCostViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExternalServicesCodesAndCostRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExternalServicesCodesAndCostService,
    ExternalServicesCodesAndCostGuard
  ],
  entryComponents: [
    ExternalServicesCodesAndCostNewComponent,
    ExternalServicesCodesAndCostEditComponent,
    ExternalServicesCodesAndCostViewComponent
  ]
})

export class ExternalServicesCodesAndCostModule {
}
