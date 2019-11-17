import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MinistryOfSolidarityAndCommunicationsListComponent } from './ministry-of-solidarity-and-communications-list/ministry-of-solidarity-and-communications-list.component';
import { MinistryOfSolidarityAndCommunicationsEditComponent } from './ministry-of-solidarity-and-communications-edit/ministry-of-solidarity-and-communications-edit.component';
import { MinistryOfSolidarityAndCommunicationsNewComponent } from './ministry-of-solidarity-and-communications-new/ministry-of-solidarity-and-communications-new.component';
import { MinistryOfSolidarityAndCommunicationsViewComponent } from './ministry-of-solidarity-and-communications-view/ministry-of-solidarity-and-communications-view.component';
import { MinistryOfSolidarityAndCommunicationsRoutingModule } from './ministry-of-solidarity-and-communications.routing.module';
import { MinistryOfSolidarityAndCommunicationsService } from './shared/ministry-of-solidarity-and-communications.service';
import { MinistryOfSolidarityAndCommunicationsGuard } from './shared/ministry-of-solidarity-and-communications.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MinistryOfSolidarityAndCommunicationsListComponent,
    MinistryOfSolidarityAndCommunicationsNewComponent,
    MinistryOfSolidarityAndCommunicationsEditComponent,
    MinistryOfSolidarityAndCommunicationsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MinistryOfSolidarityAndCommunicationsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MinistryOfSolidarityAndCommunicationsService,
    MinistryOfSolidarityAndCommunicationsGuard
  ],
  entryComponents: [
    MinistryOfSolidarityAndCommunicationsNewComponent,
    MinistryOfSolidarityAndCommunicationsEditComponent,
    MinistryOfSolidarityAndCommunicationsViewComponent
  ]
})

export class MinistryOfSolidarityAndCommunicationsModule {
}
