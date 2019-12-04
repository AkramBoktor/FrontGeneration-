import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ProcessingListComponent } from './processing-list/processing-list.component';
import { ProcessingEditComponent } from './processing-edit/processing-edit.component';
import { ProcessingNewComponent } from './processing-new/processing-new.component';
import { ProcessingViewComponent } from './processing-view/processing-view.component';
import { ProcessingRoutingModule } from './processing.routing.module';
import { ProcessingService } from './shared/processing.service';
import { ProcessingGuard } from './shared/processing.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ProcessingListComponent,
    ProcessingNewComponent,
    ProcessingEditComponent,
    ProcessingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ProcessingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ProcessingService,
    ProcessingGuard
  ],
  entryComponents: [
    ProcessingNewComponent,
    ProcessingEditComponent,
    ProcessingViewComponent
  ]
})

export class ProcessingModule {
}
