import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BasicDataOfTheEducationalBuildingCairoBranchListComponent } from './basic-data-of-the-educational-building-cairo-branch-list/basic-data-of-the-educational-building-cairo-branch-list.component';
import { BasicDataOfTheEducationalBuildingCairoBranchEditComponent } from './basic-data-of-the-educational-building-cairo-branch-edit/basic-data-of-the-educational-building-cairo-branch-edit.component';
import { BasicDataOfTheEducationalBuildingCairoBranchNewComponent } from './basic-data-of-the-educational-building-cairo-branch-new/basic-data-of-the-educational-building-cairo-branch-new.component';
import { BasicDataOfTheEducationalBuildingCairoBranchViewComponent } from './basic-data-of-the-educational-building-cairo-branch-view/basic-data-of-the-educational-building-cairo-branch-view.component';
import { BasicDataOfTheEducationalBuildingCairoBranchRoutingModule } from './basic-data-of-the-educational-building-cairo-branch.routing.module';
import { BasicDataOfTheEducationalBuildingCairoBranchService } from './shared/basic-data-of-the-educational-building-cairo-branch.service';
import { BasicDataOfTheEducationalBuildingCairoBranchGuard } from './shared/basic-data-of-the-educational-building-cairo-branch.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BasicDataOfTheEducationalBuildingCairoBranchListComponent,
    BasicDataOfTheEducationalBuildingCairoBranchNewComponent,
    BasicDataOfTheEducationalBuildingCairoBranchEditComponent,
    BasicDataOfTheEducationalBuildingCairoBranchViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BasicDataOfTheEducationalBuildingCairoBranchRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BasicDataOfTheEducationalBuildingCairoBranchService,
    BasicDataOfTheEducationalBuildingCairoBranchGuard
  ],
  entryComponents: [
    BasicDataOfTheEducationalBuildingCairoBranchNewComponent,
    BasicDataOfTheEducationalBuildingCairoBranchEditComponent,
    BasicDataOfTheEducationalBuildingCairoBranchViewComponent
  ]
})

export class BasicDataOfTheEducationalBuildingCairoBranchModule {
}
