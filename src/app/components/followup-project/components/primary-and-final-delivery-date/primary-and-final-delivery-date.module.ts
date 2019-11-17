import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PrimaryAndFinalDeliveryDateListComponent } from './primary-and-final-delivery-date-list/primary-and-final-delivery-date-list.component';
import { PrimaryAndFinalDeliveryDateEditComponent } from './primary-and-final-delivery-date-edit/primary-and-final-delivery-date-edit.component';
import { PrimaryAndFinalDeliveryDateNewComponent } from './primary-and-final-delivery-date-new/primary-and-final-delivery-date-new.component';
import { PrimaryAndFinalDeliveryDateViewComponent } from './primary-and-final-delivery-date-view/primary-and-final-delivery-date-view.component';
import { PrimaryAndFinalDeliveryDateRoutingModule } from './primary-and-final-delivery-date.routing.module';
import { PrimaryAndFinalDeliveryDateService } from './shared/primary-and-final-delivery-date.service';
import { PrimaryAndFinalDeliveryDateGuard } from './shared/primary-and-final-delivery-date.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PrimaryAndFinalDeliveryDateListComponent,
    PrimaryAndFinalDeliveryDateNewComponent,
    PrimaryAndFinalDeliveryDateEditComponent,
    PrimaryAndFinalDeliveryDateViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PrimaryAndFinalDeliveryDateRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PrimaryAndFinalDeliveryDateService,
    PrimaryAndFinalDeliveryDateGuard
  ],
  entryComponents: [
    PrimaryAndFinalDeliveryDateNewComponent,
    PrimaryAndFinalDeliveryDateEditComponent,
    PrimaryAndFinalDeliveryDateViewComponent
  ]
})

export class PrimaryAndFinalDeliveryDateModule {
}
