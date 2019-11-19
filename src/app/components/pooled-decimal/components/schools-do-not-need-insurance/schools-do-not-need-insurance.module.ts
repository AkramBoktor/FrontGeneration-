import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SchoolsDoNotNeedInsuranceListComponent } from './schools-do-not-need-insurance-list/schools-do-not-need-insurance-list.component';
import { SchoolsDoNotNeedInsuranceEditComponent } from './schools-do-not-need-insurance-edit/schools-do-not-need-insurance-edit.component';
import { SchoolsDoNotNeedInsuranceNewComponent } from './schools-do-not-need-insurance-new/schools-do-not-need-insurance-new.component';
import { SchoolsDoNotNeedInsuranceViewComponent } from './schools-do-not-need-insurance-view/schools-do-not-need-insurance-view.component';
import { SchoolsDoNotNeedInsuranceRoutingModule } from './schools-do-not-need-insurance.routing.module';
import { SchoolsDoNotNeedInsuranceService } from './shared/schools-do-not-need-insurance.service';
import { SchoolsDoNotNeedInsuranceGuard } from './shared/schools-do-not-need-insurance.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SchoolsDoNotNeedInsuranceListComponent,
    SchoolsDoNotNeedInsuranceNewComponent,
    SchoolsDoNotNeedInsuranceEditComponent,
    SchoolsDoNotNeedInsuranceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SchoolsDoNotNeedInsuranceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SchoolsDoNotNeedInsuranceService,
    SchoolsDoNotNeedInsuranceGuard
  ],
  entryComponents: [
    SchoolsDoNotNeedInsuranceNewComponent,
    SchoolsDoNotNeedInsuranceEditComponent,
    SchoolsDoNotNeedInsuranceViewComponent
  ]
})

export class SchoolsDoNotNeedInsuranceModule {
}
