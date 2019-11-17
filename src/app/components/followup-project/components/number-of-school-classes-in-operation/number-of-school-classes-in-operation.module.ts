import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { NumberOfSchoolClassesInOperationListComponent } from './number-of-school-classes-in-operation-list/number-of-school-classes-in-operation-list.component';
import { NumberOfSchoolClassesInOperationEditComponent } from './number-of-school-classes-in-operation-edit/number-of-school-classes-in-operation-edit.component';
import { NumberOfSchoolClassesInOperationNewComponent } from './number-of-school-classes-in-operation-new/number-of-school-classes-in-operation-new.component';
import { NumberOfSchoolClassesInOperationViewComponent } from './number-of-school-classes-in-operation-view/number-of-school-classes-in-operation-view.component';
import { NumberOfSchoolClassesInOperationRoutingModule } from './number-of-school-classes-in-operation.routing.module';
import { NumberOfSchoolClassesInOperationService } from './shared/number-of-school-classes-in-operation.service';
import { NumberOfSchoolClassesInOperationGuard } from './shared/number-of-school-classes-in-operation.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    NumberOfSchoolClassesInOperationListComponent,
    NumberOfSchoolClassesInOperationNewComponent,
    NumberOfSchoolClassesInOperationEditComponent,
    NumberOfSchoolClassesInOperationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    NumberOfSchoolClassesInOperationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    NumberOfSchoolClassesInOperationService,
    NumberOfSchoolClassesInOperationGuard
  ],
  entryComponents: [
    NumberOfSchoolClassesInOperationNewComponent,
    NumberOfSchoolClassesInOperationEditComponent,
    NumberOfSchoolClassesInOperationViewComponent
  ]
})

export class NumberOfSchoolClassesInOperationModule {
}
