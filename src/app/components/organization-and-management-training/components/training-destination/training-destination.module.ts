import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TrainingDestinationListComponent } from './training-destination-list/training-destination-list.component';
import { TrainingDestinationEditComponent } from './training-destination-edit/training-destination-edit.component';
import { TrainingDestinationNewComponent } from './training-destination-new/training-destination-new.component';
import { TrainingDestinationViewComponent } from './training-destination-view/training-destination-view.component';
import { TrainingDestinationRoutingModule } from './training-destination.routing.module';
import { TrainingDestinationService } from './shared/training-destination.service';
import { TrainingDestinationGuard } from './shared/training-destination.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TrainingDestinationListComponent,
    TrainingDestinationNewComponent,
    TrainingDestinationEditComponent,
    TrainingDestinationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TrainingDestinationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TrainingDestinationService,
    TrainingDestinationGuard
  ],
  entryComponents: [
    TrainingDestinationNewComponent,
    TrainingDestinationEditComponent,
    TrainingDestinationViewComponent
  ]
})

export class TrainingDestinationModule {
}
