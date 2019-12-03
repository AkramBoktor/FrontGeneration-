import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TheNumberOfApplicationReceivedInTheSamplesHallListComponent } from './the-number-of-application-received-in-the-samples-hall-list/the-number-of-application-received-in-the-samples-hall-list.component';
import { TheNumberOfApplicationReceivedInTheSamplesHallEditComponent } from './the-number-of-application-received-in-the-samples-hall-edit/the-number-of-application-received-in-the-samples-hall-edit.component';
import { TheNumberOfApplicationReceivedInTheSamplesHallNewComponent } from './the-number-of-application-received-in-the-samples-hall-new/the-number-of-application-received-in-the-samples-hall-new.component';
import { TheNumberOfApplicationReceivedInTheSamplesHallViewComponent } from './the-number-of-application-received-in-the-samples-hall-view/the-number-of-application-received-in-the-samples-hall-view.component';
import { TheNumberOfApplicationReceivedInTheSamplesHallRoutingModule } from './the-number-of-application-received-in-the-samples-hall.routing.module';
import { TheNumberOfApplicationReceivedInTheSamplesHallService } from './shared/the-number-of-application-received-in-the-samples-hall.service';
import { TheNumberOfApplicationReceivedInTheSamplesHallGuard } from './shared/the-number-of-application-received-in-the-samples-hall.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TheNumberOfApplicationReceivedInTheSamplesHallListComponent,
    TheNumberOfApplicationReceivedInTheSamplesHallNewComponent,
    TheNumberOfApplicationReceivedInTheSamplesHallEditComponent,
    TheNumberOfApplicationReceivedInTheSamplesHallViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TheNumberOfApplicationReceivedInTheSamplesHallRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TheNumberOfApplicationReceivedInTheSamplesHallService,
    TheNumberOfApplicationReceivedInTheSamplesHallGuard
  ],
  entryComponents: [
    TheNumberOfApplicationReceivedInTheSamplesHallNewComponent,
    TheNumberOfApplicationReceivedInTheSamplesHallEditComponent,
    TheNumberOfApplicationReceivedInTheSamplesHallViewComponent
  ]
})

export class TheNumberOfApplicationReceivedInTheSamplesHallModule {
}
