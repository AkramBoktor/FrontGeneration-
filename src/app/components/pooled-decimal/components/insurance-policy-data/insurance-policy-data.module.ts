import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { InsurancePolicyDataListComponent } from './insurance-policy-data-list/insurance-policy-data-list.component';
import { InsurancePolicyDataEditComponent } from './insurance-policy-data-edit/insurance-policy-data-edit.component';
import { InsurancePolicyDataNewComponent } from './insurance-policy-data-new/insurance-policy-data-new.component';
import { InsurancePolicyDataViewComponent } from './insurance-policy-data-view/insurance-policy-data-view.component';
import { InsurancePolicyDataRoutingModule } from './insurance-policy-data.routing.module';
import { InsurancePolicyDataService } from './shared/insurance-policy-data.service';
import { InsurancePolicyDataGuard } from './shared/insurance-policy-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    InsurancePolicyDataListComponent,
    InsurancePolicyDataNewComponent,
    InsurancePolicyDataEditComponent,
    InsurancePolicyDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    InsurancePolicyDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    InsurancePolicyDataService,
    InsurancePolicyDataGuard
  ],
  entryComponents: [
    InsurancePolicyDataNewComponent,
    InsurancePolicyDataEditComponent,
    InsurancePolicyDataViewComponent
  ]
})

export class InsurancePolicyDataModule {
}
