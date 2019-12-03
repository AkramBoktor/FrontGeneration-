import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBListComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-b-list/termination-of-the-participation-of-an-employee-in-the-fund-b-list.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBEditComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-b-edit/termination-of-the-participation-of-an-employee-in-the-fund-b-edit.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBNewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-b-new/termination-of-the-participation-of-an-employee-in-the-fund-b-new.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBViewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-b-view/termination-of-the-participation-of-an-employee-in-the-fund-b-view.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBRoutingModule } from './termination-of-the-participation-of-an-employee-in-the-fund-b.routing.module';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBService } from './shared/termination-of-the-participation-of-an-employee-in-the-fund-b.service';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBGuard } from './shared/termination-of-the-participation-of-an-employee-in-the-fund-b.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TerminationOfTheParticipationOfAnEmployeeInTheFundBListComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundBNewComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundBEditComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundBViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TerminationOfTheParticipationOfAnEmployeeInTheFundBRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TerminationOfTheParticipationOfAnEmployeeInTheFundBService,
    TerminationOfTheParticipationOfAnEmployeeInTheFundBGuard
  ],
  entryComponents: [
    TerminationOfTheParticipationOfAnEmployeeInTheFundBNewComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundBEditComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundBViewComponent
  ]
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundBModule {
}
