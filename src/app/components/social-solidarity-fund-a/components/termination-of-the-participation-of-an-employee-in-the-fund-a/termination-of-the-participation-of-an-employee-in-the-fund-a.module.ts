import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAListComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-a-list/termination-of-the-participation-of-an-employee-in-the-fund-a-list.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAEditComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-a-edit/termination-of-the-participation-of-an-employee-in-the-fund-a-edit.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundANewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-a-new/termination-of-the-participation-of-an-employee-in-the-fund-a-new.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAViewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-a-view/termination-of-the-participation-of-an-employee-in-the-fund-a-view.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundARoutingModule } from './termination-of-the-participation-of-an-employee-in-the-fund-a.routing.module';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAService } from './shared/termination-of-the-participation-of-an-employee-in-the-fund-a.service';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAGuard } from './shared/termination-of-the-participation-of-an-employee-in-the-fund-a.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TerminationOfTheParticipationOfAnEmployeeInTheFundAListComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundANewComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundAEditComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundAViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TerminationOfTheParticipationOfAnEmployeeInTheFundARoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TerminationOfTheParticipationOfAnEmployeeInTheFundAService,
    TerminationOfTheParticipationOfAnEmployeeInTheFundAGuard
  ],
  entryComponents: [
    TerminationOfTheParticipationOfAnEmployeeInTheFundANewComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundAEditComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundAViewComponent
  ]
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundAModule {
}
