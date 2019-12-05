import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TheCorrespondingSchoolNumberListComponent } from './the-corresponding-school-number-list/the-corresponding-school-number-list.component';
import { TheCorrespondingSchoolNumberEditComponent } from './the-corresponding-school-number-edit/the-corresponding-school-number-edit.component';
import { TheCorrespondingSchoolNumberNewComponent } from './the-corresponding-school-number-new/the-corresponding-school-number-new.component';
import { TheCorrespondingSchoolNumberViewComponent } from './the-corresponding-school-number-view/the-corresponding-school-number-view.component';
import { TheCorrespondingSchoolNumberRoutingModule } from './the-corresponding-school-number.routing.module';
import { TheCorrespondingSchoolNumberService } from './shared/the-corresponding-school-number.service';
import { TheCorrespondingSchoolNumberGuard } from './shared/the-corresponding-school-number.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TheCorrespondingSchoolNumberListComponent,
    TheCorrespondingSchoolNumberNewComponent,
    TheCorrespondingSchoolNumberEditComponent,
    TheCorrespondingSchoolNumberViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TheCorrespondingSchoolNumberRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TheCorrespondingSchoolNumberService,
    TheCorrespondingSchoolNumberGuard
  ],
  entryComponents: [
    TheCorrespondingSchoolNumberNewComponent,
    TheCorrespondingSchoolNumberEditComponent,
    TheCorrespondingSchoolNumberViewComponent
  ]
})

export class TheCorrespondingSchoolNumberModule {
}
