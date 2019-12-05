import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EtisalatBillingAccountListComponent } from './etisalat-billing-account-list/etisalat-billing-account-list.component';
import { EtisalatBillingAccountEditComponent } from './etisalat-billing-account-edit/etisalat-billing-account-edit.component';
import { EtisalatBillingAccountNewComponent } from './etisalat-billing-account-new/etisalat-billing-account-new.component';
import { EtisalatBillingAccountViewComponent } from './etisalat-billing-account-view/etisalat-billing-account-view.component';
import { EtisalatBillingAccountRoutingModule } from './etisalat-billing-account.routing.module';
import { EtisalatBillingAccountService } from './shared/etisalat-billing-account.service';
import { EtisalatBillingAccountGuard } from './shared/etisalat-billing-account.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EtisalatBillingAccountListComponent,
    EtisalatBillingAccountNewComponent,
    EtisalatBillingAccountEditComponent,
    EtisalatBillingAccountViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EtisalatBillingAccountRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EtisalatBillingAccountService,
    EtisalatBillingAccountGuard
  ],
  entryComponents: [
    EtisalatBillingAccountNewComponent,
    EtisalatBillingAccountEditComponent,
    EtisalatBillingAccountViewComponent
  ]
})

export class EtisalatBillingAccountModule {
}
