import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BusinessCostChecksListComponent } from './business-cost-checks-list/business-cost-checks-list.component';
import { BusinessCostChecksEditComponent } from './business-cost-checks-edit/business-cost-checks-edit.component';
import { BusinessCostChecksNewComponent } from './business-cost-checks-new/business-cost-checks-new.component';
import { BusinessCostChecksViewComponent } from './business-cost-checks-view/business-cost-checks-view.component';
import { BusinessCostChecksRoutingModule } from './business-cost-checks.routing.module';
import { BusinessCostChecksService } from './shared/business-cost-checks.service';
import { BusinessCostChecksGuard } from './shared/business-cost-checks.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BusinessCostChecksListComponent,
    BusinessCostChecksNewComponent,
    BusinessCostChecksEditComponent,
    BusinessCostChecksViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BusinessCostChecksRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BusinessCostChecksService,
    BusinessCostChecksGuard
  ],
  entryComponents: [
    BusinessCostChecksNewComponent,
    BusinessCostChecksEditComponent,
    BusinessCostChecksViewComponent
  ]
})

export class BusinessCostChecksModule {
}
