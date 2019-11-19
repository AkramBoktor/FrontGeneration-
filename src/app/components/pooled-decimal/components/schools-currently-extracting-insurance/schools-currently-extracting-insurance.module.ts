import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SchoolsCurrentlyExtractingInsuranceListComponent } from './schools-currently-extracting-insurance-list/schools-currently-extracting-insurance-list.component';
import { SchoolsCurrentlyExtractingInsuranceEditComponent } from './schools-currently-extracting-insurance-edit/schools-currently-extracting-insurance-edit.component';
import { SchoolsCurrentlyExtractingInsuranceNewComponent } from './schools-currently-extracting-insurance-new/schools-currently-extracting-insurance-new.component';
import { SchoolsCurrentlyExtractingInsuranceViewComponent } from './schools-currently-extracting-insurance-view/schools-currently-extracting-insurance-view.component';
import { SchoolsCurrentlyExtractingInsuranceRoutingModule } from './schools-currently-extracting-insurance.routing.module';
import { SchoolsCurrentlyExtractingInsuranceService } from './shared/schools-currently-extracting-insurance.service';
import { SchoolsCurrentlyExtractingInsuranceGuard } from './shared/schools-currently-extracting-insurance.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SchoolsCurrentlyExtractingInsuranceListComponent,
    SchoolsCurrentlyExtractingInsuranceNewComponent,
    SchoolsCurrentlyExtractingInsuranceEditComponent,
    SchoolsCurrentlyExtractingInsuranceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SchoolsCurrentlyExtractingInsuranceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SchoolsCurrentlyExtractingInsuranceService,
    SchoolsCurrentlyExtractingInsuranceGuard
  ],
  entryComponents: [
    SchoolsCurrentlyExtractingInsuranceNewComponent,
    SchoolsCurrentlyExtractingInsuranceEditComponent,
    SchoolsCurrentlyExtractingInsuranceViewComponent
  ]
})

export class SchoolsCurrentlyExtractingInsuranceModule {
}
