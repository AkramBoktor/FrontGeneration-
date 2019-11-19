import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ObstaclesAndMeasuresTakenListComponent } from './obstacles-and-measures-taken-list/obstacles-and-measures-taken-list.component';
import { ObstaclesAndMeasuresTakenEditComponent } from './obstacles-and-measures-taken-edit/obstacles-and-measures-taken-edit.component';
import { ObstaclesAndMeasuresTakenNewComponent } from './obstacles-and-measures-taken-new/obstacles-and-measures-taken-new.component';
import { ObstaclesAndMeasuresTakenViewComponent } from './obstacles-and-measures-taken-view/obstacles-and-measures-taken-view.component';
import { ObstaclesAndMeasuresTakenRoutingModule } from './obstacles-and-measures-taken.routing.module';
import { ObstaclesAndMeasuresTakenService } from './shared/obstacles-and-measures-taken.service';
import { ObstaclesAndMeasuresTakenGuard } from './shared/obstacles-and-measures-taken.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ObstaclesAndMeasuresTakenListComponent,
    ObstaclesAndMeasuresTakenNewComponent,
    ObstaclesAndMeasuresTakenEditComponent,
    ObstaclesAndMeasuresTakenViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ObstaclesAndMeasuresTakenRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ObstaclesAndMeasuresTakenService,
    ObstaclesAndMeasuresTakenGuard
  ],
  entryComponents: [
    ObstaclesAndMeasuresTakenNewComponent,
    ObstaclesAndMeasuresTakenEditComponent,
    ObstaclesAndMeasuresTakenViewComponent
  ]
})

export class ObstaclesAndMeasuresTakenModule {
}
