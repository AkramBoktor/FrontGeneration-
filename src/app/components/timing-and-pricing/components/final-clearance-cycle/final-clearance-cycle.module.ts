import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FinalClearanceCycleListComponent } from './final-clearance-cycle-list/final-clearance-cycle-list.component';
import { FinalClearanceCycleEditComponent } from './final-clearance-cycle-edit/final-clearance-cycle-edit.component';
import { FinalClearanceCycleNewComponent } from './final-clearance-cycle-new/final-clearance-cycle-new.component';
import { FinalClearanceCycleViewComponent } from './final-clearance-cycle-view/final-clearance-cycle-view.component';
import { FinalClearanceCycleRoutingModule } from './final-clearance-cycle.routing.module';
import { FinalClearanceCycleService } from './shared/final-clearance-cycle.service';
import { FinalClearanceCycleGuard } from './shared/final-clearance-cycle.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FinalClearanceCycleListComponent,
    FinalClearanceCycleNewComponent,
    FinalClearanceCycleEditComponent,
    FinalClearanceCycleViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FinalClearanceCycleRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FinalClearanceCycleService,
    FinalClearanceCycleGuard
  ],
  entryComponents: [
    FinalClearanceCycleNewComponent,
    FinalClearanceCycleEditComponent,
    FinalClearanceCycleViewComponent
  ]
})

export class FinalClearanceCycleModule {
}
