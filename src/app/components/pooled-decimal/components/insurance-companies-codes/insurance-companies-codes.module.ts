import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { InsuranceCompaniesCodesListComponent } from './insurance-companies-codes-list/insurance-companies-codes-list.component';
import { InsuranceCompaniesCodesEditComponent } from './insurance-companies-codes-edit/insurance-companies-codes-edit.component';
import { InsuranceCompaniesCodesNewComponent } from './insurance-companies-codes-new/insurance-companies-codes-new.component';
import { InsuranceCompaniesCodesViewComponent } from './insurance-companies-codes-view/insurance-companies-codes-view.component';
import { InsuranceCompaniesCodesRoutingModule } from './insurance-companies-codes.routing.module';
import { InsuranceCompaniesCodesService } from './shared/insurance-companies-codes.service';
import { InsuranceCompaniesCodesGuard } from './shared/insurance-companies-codes.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    InsuranceCompaniesCodesListComponent,
    InsuranceCompaniesCodesNewComponent,
    InsuranceCompaniesCodesEditComponent,
    InsuranceCompaniesCodesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    InsuranceCompaniesCodesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    InsuranceCompaniesCodesService,
    InsuranceCompaniesCodesGuard
  ],
  entryComponents: [
    InsuranceCompaniesCodesNewComponent,
    InsuranceCompaniesCodesEditComponent,
    InsuranceCompaniesCodesViewComponent
  ]
})

export class InsuranceCompaniesCodesModule {
}
