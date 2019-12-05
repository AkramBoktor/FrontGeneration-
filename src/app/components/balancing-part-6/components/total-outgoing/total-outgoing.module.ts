import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TotalOutgoingListComponent } from './total-outgoing-list/total-outgoing-list.component';
import { TotalOutgoingEditComponent } from './total-outgoing-edit/total-outgoing-edit.component';
import { TotalOutgoingNewComponent } from './total-outgoing-new/total-outgoing-new.component';
import { TotalOutgoingViewComponent } from './total-outgoing-view/total-outgoing-view.component';
import { TotalOutgoingRoutingModule } from './total-outgoing.routing.module';
import { TotalOutgoingService } from './shared/total-outgoing.service';
import { TotalOutgoingGuard } from './shared/total-outgoing.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TotalOutgoingListComponent,
    TotalOutgoingNewComponent,
    TotalOutgoingEditComponent,
    TotalOutgoingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TotalOutgoingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TotalOutgoingService,
    TotalOutgoingGuard
  ],
  entryComponents: [
    TotalOutgoingNewComponent,
    TotalOutgoingEditComponent,
    TotalOutgoingViewComponent
  ]
})

export class TotalOutgoingModule {
}
