import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TerminationOfTheEmployee'sJobPlacementListComponent } from './termination-of-the-employee's-job-placement-list/termination-of-the-employee's-job-placement-list.component';
import { TerminationOfTheEmployee'sJobPlacementEditComponent } from './termination-of-the-employee's-job-placement-edit/termination-of-the-employee's-job-placement-edit.component';
import { TerminationOfTheEmployee'sJobPlacementNewComponent } from './termination-of-the-employee's-job-placement-new/termination-of-the-employee's-job-placement-new.component';
import { TerminationOfTheEmployee'sJobPlacementViewComponent } from './termination-of-the-employee's-job-placement-view/termination-of-the-employee's-job-placement-view.component';
import { TerminationOfTheEmployee'sJobPlacementRoutingModule } from './termination-of-the-employee's-job-placement.routing.module';
import { TerminationOfTheEmployee'sJobPlacementService } from './shared/termination-of-the-employee's-job-placement.service';
import { TerminationOfTheEmployee'sJobPlacementGuard } from './shared/termination-of-the-employee's-job-placement.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TerminationOfTheEmployee'sJobPlacementListComponent,
    TerminationOfTheEmployee'sJobPlacementNewComponent,
    TerminationOfTheEmployee'sJobPlacementEditComponent,
    TerminationOfTheEmployee'sJobPlacementViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TerminationOfTheEmployee'sJobPlacementRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TerminationOfTheEmployee'sJobPlacementService,
    TerminationOfTheEmployee'sJobPlacementGuard
  ],
  entryComponents: [
    TerminationOfTheEmployee'sJobPlacementNewComponent,
    TerminationOfTheEmployee'sJobPlacementEditComponent,
    TerminationOfTheEmployee'sJobPlacementViewComponent
  ]
})

export class TerminationOfTheEmployee'sJobPlacementModule {
}
