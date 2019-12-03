import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGListComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-g-list/termination-of-the-participation-of-an-employee-in-the-fund-g-list.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGEditComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-g-edit/termination-of-the-participation-of-an-employee-in-the-fund-g-edit.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGNewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-g-new/termination-of-the-participation-of-an-employee-in-the-fund-g-new.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGViewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-g-view/termination-of-the-participation-of-an-employee-in-the-fund-g-view.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGRoutingModule } from './termination-of-the-participation-of-an-employee-in-the-fund-g.routing.module';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGService } from './shared/termination-of-the-participation-of-an-employee-in-the-fund-g.service';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGGuard } from './shared/termination-of-the-participation-of-an-employee-in-the-fund-g.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TerminationOfTheParticipationOfAnEmployeeInTheFundGListComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundGNewComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundGEditComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundGViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TerminationOfTheParticipationOfAnEmployeeInTheFundGRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TerminationOfTheParticipationOfAnEmployeeInTheFundGService,
    TerminationOfTheParticipationOfAnEmployeeInTheFundGGuard
  ],
  entryComponents: [
    TerminationOfTheParticipationOfAnEmployeeInTheFundGNewComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundGEditComponent,
    TerminationOfTheParticipationOfAnEmployeeInTheFundGViewComponent
  ]
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundGModule {
}
