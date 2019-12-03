import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchListComponent } from './correction-data-spaces-of-the-educational-building-cairo-branch-list/correction-data-spaces-of-the-educational-building-cairo-branch-list.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchEditComponent } from './correction-data-spaces-of-the-educational-building-cairo-branch-edit/correction-data-spaces-of-the-educational-building-cairo-branch-edit.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchNewComponent } from './correction-data-spaces-of-the-educational-building-cairo-branch-new/correction-data-spaces-of-the-educational-building-cairo-branch-new.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchViewComponent } from './correction-data-spaces-of-the-educational-building-cairo-branch-view/correction-data-spaces-of-the-educational-building-cairo-branch-view.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchRoutingModule } from './correction-data-spaces-of-the-educational-building-cairo-branch.routing.module';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService } from './shared/correction-data-spaces-of-the-educational-building-cairo-branch.service';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchGuard } from './shared/correction-data-spaces-of-the-educational-building-cairo-branch.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CorrectionDataSpacesOfTheEducationalBuildingCairoBranchListComponent,
    CorrectionDataSpacesOfTheEducationalBuildingCairoBranchNewComponent,
    CorrectionDataSpacesOfTheEducationalBuildingCairoBranchEditComponent,
    CorrectionDataSpacesOfTheEducationalBuildingCairoBranchViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CorrectionDataSpacesOfTheEducationalBuildingCairoBranchRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService,
    CorrectionDataSpacesOfTheEducationalBuildingCairoBranchGuard
  ],
  entryComponents: [
    CorrectionDataSpacesOfTheEducationalBuildingCairoBranchNewComponent,
    CorrectionDataSpacesOfTheEducationalBuildingCairoBranchEditComponent,
    CorrectionDataSpacesOfTheEducationalBuildingCairoBranchViewComponent
  ]
})

export class CorrectionDataSpacesOfTheEducationalBuildingCairoBranchModule {
}
