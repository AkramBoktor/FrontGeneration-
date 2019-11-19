import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExtensionInsurancePolicyDataListComponent } from './extension-insurance-policy-data-list/extension-insurance-policy-data-list.component';
import { ExtensionInsurancePolicyDataEditComponent } from './extension-insurance-policy-data-edit/extension-insurance-policy-data-edit.component';
import { ExtensionInsurancePolicyDataNewComponent } from './extension-insurance-policy-data-new/extension-insurance-policy-data-new.component';
import { ExtensionInsurancePolicyDataViewComponent } from './extension-insurance-policy-data-view/extension-insurance-policy-data-view.component';
import { ExtensionInsurancePolicyDataRoutingModule } from './extension-insurance-policy-data.routing.module';
import { ExtensionInsurancePolicyDataService } from './shared/extension-insurance-policy-data.service';
import { ExtensionInsurancePolicyDataGuard } from './shared/extension-insurance-policy-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExtensionInsurancePolicyDataListComponent,
    ExtensionInsurancePolicyDataNewComponent,
    ExtensionInsurancePolicyDataEditComponent,
    ExtensionInsurancePolicyDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExtensionInsurancePolicyDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExtensionInsurancePolicyDataService,
    ExtensionInsurancePolicyDataGuard
  ],
  entryComponents: [
    ExtensionInsurancePolicyDataNewComponent,
    ExtensionInsurancePolicyDataEditComponent,
    ExtensionInsurancePolicyDataViewComponent
  ]
})

export class ExtensionInsurancePolicyDataModule {
}
