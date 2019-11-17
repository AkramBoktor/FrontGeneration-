import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ArbitrationTopicsEditComponent } from './arbitration-topics-edit/arbitration-topics-edit.component';
import { ArbitrationTopicsListComponent } from './arbitration-topics-list/arbitration-topics-list.component';
import { ArbitrationTopicsNewComponent } from './arbitration-topics-new/arbitration-topics-new.component';
import { ArbitrationTopicsViewComponent } from './arbitration-topics-view/arbitration-topics-view.component';
import { ArbitrationTopicsRoutingModule } from './arbitration-topics.routing.module';
import { ArbitrationTopicsGuard } from './shared/arbitration-topics.guard';
import { ArbitrationTopicsService } from './shared/arbitration-topics.service';

@NgModule({
  declarations: [
    ArbitrationTopicsListComponent,
    ArbitrationTopicsNewComponent,
    ArbitrationTopicsEditComponent,
    ArbitrationTopicsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ArbitrationTopicsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ArbitrationTopicsService,
    ArbitrationTopicsGuard
  ],
  entryComponents: [
    ArbitrationTopicsNewComponent,
    ArbitrationTopicsEditComponent,
    ArbitrationTopicsViewComponent
  ]
})

export class ArbitrationTopicsModule {
}
