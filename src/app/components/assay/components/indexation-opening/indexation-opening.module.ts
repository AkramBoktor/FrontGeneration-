import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { IndexationOpeningListComponent } from './indexation-opening-list/indexation-opening-list.component';
import { IndexationOpeningEditComponent } from './indexation-opening-edit/indexation-opening-edit.component';
import { IndexationOpeningNewComponent } from './indexation-opening-new/indexation-opening-new.component';
import { IndexationOpeningViewComponent } from './indexation-opening-view/indexation-opening-view.component';
import { IndexationOpeningRoutingModule } from './indexation-opening.routing.module';
import { IndexationOpeningService } from './shared/indexation-opening.service';
import { IndexationOpeningGuard } from './shared/indexation-opening.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    IndexationOpeningListComponent,
    IndexationOpeningNewComponent,
    IndexationOpeningEditComponent,
    IndexationOpeningViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    IndexationOpeningRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    IndexationOpeningService,
    IndexationOpeningGuard
  ],
  entryComponents: [
    IndexationOpeningNewComponent,
    IndexationOpeningEditComponent,
    IndexationOpeningViewComponent
  ]
})

export class IndexationOpeningModule {
}
