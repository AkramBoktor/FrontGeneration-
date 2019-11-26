import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TerminationOfTheEmployeesJobPlacementListComponent } from './termination-of-the-employees-job-placement-list/termination-of-the-employees-job-placement-list.component';
import { TerminationOfTheEmployeesJobPlacementEditComponent } from './termination-of-the-employees-job-placement-edit/termination-of-the-employees-job-placement-edit.component';
import { TerminationOfTheEmployeesJobPlacementNewComponent } from './termination-of-the-employees-job-placement-new/termination-of-the-employees-job-placement-new.component';
import { TerminationOfTheEmployeesJobPlacementViewComponent } from './termination-of-the-employees-job-placement-view/termination-of-the-employees-job-placement-view.component';
import { TerminationOfTheEmployeesJobPlacementRoutingModule } from './termination-of-the-employees-job-placement.routing.module';
import { TerminationOfTheEmployeesJobPlacementService } from './shared/termination-of-the-employees-job-placement.service';
import { TerminationOfTheEmployeesJobPlacementGuard } from './shared/termination-of-the-employees-job-placement.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TerminationOfTheEmployeesJobPlacementListComponent,
    TerminationOfTheEmployeesJobPlacementNewComponent,
    TerminationOfTheEmployeesJobPlacementEditComponent,
    TerminationOfTheEmployeesJobPlacementViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TerminationOfTheEmployeesJobPlacementRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TerminationOfTheEmployeesJobPlacementService,
    TerminationOfTheEmployeesJobPlacementGuard
  ],
  entryComponents: [
    TerminationOfTheEmployeesJobPlacementNewComponent,
    TerminationOfTheEmployeesJobPlacementEditComponent,
    TerminationOfTheEmployeesJobPlacementViewComponent
  ]
})

export class TerminationOfTheEmployeesJobPlacementModule {
}
