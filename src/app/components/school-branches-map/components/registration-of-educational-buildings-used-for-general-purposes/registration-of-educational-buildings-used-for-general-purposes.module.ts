import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesListComponent } from './registration-of-educational-buildings-used-for-general-purposes-list/registration-of-educational-buildings-used-for-general-purposes-list.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesEditComponent } from './registration-of-educational-buildings-used-for-general-purposes-edit/registration-of-educational-buildings-used-for-general-purposes-edit.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesNewComponent } from './registration-of-educational-buildings-used-for-general-purposes-new/registration-of-educational-buildings-used-for-general-purposes-new.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesViewComponent } from './registration-of-educational-buildings-used-for-general-purposes-view/registration-of-educational-buildings-used-for-general-purposes-view.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesRoutingModule } from './registration-of-educational-buildings-used-for-general-purposes.routing.module';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesService } from './shared/registration-of-educational-buildings-used-for-general-purposes.service';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesGuard } from './shared/registration-of-educational-buildings-used-for-general-purposes.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RegistrationOfEducationalBuildingsUsedForGeneralPurposesListComponent,
    RegistrationOfEducationalBuildingsUsedForGeneralPurposesNewComponent,
    RegistrationOfEducationalBuildingsUsedForGeneralPurposesEditComponent,
    RegistrationOfEducationalBuildingsUsedForGeneralPurposesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RegistrationOfEducationalBuildingsUsedForGeneralPurposesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RegistrationOfEducationalBuildingsUsedForGeneralPurposesService,
    RegistrationOfEducationalBuildingsUsedForGeneralPurposesGuard
  ],
  entryComponents: [
    RegistrationOfEducationalBuildingsUsedForGeneralPurposesNewComponent,
    RegistrationOfEducationalBuildingsUsedForGeneralPurposesEditComponent,
    RegistrationOfEducationalBuildingsUsedForGeneralPurposesViewComponent
  ]
})

export class RegistrationOfEducationalBuildingsUsedForGeneralPurposesModule {
}
