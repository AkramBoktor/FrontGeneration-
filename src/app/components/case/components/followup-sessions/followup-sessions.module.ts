import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FollowupSessionsEditComponent } from './followup-sessions-edit/followup-sessions-edit.component';
import { FollowupSessionsListComponent } from './followup-sessions-list/followup-sessions-list.component';
import { FollowupSessionsNewComponent } from './followup-sessions-new/followup-sessions-new.component';
import { FollowupSessionsViewComponent } from './followup-sessions-view/followup-sessions-view.component';
import { FollowupSessionsRoutingModule } from './followup-sessions.routing.module';
import { FollowupSessionsGuard } from './shared/followup-sessions.guard';
import { FollowupSessionsService } from './shared/followup-sessions.service';

@NgModule({
  declarations: [
    FollowupSessionsListComponent,
    FollowupSessionsNewComponent,
    FollowupSessionsEditComponent,
    FollowupSessionsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FollowupSessionsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FollowupSessionsService,
    FollowupSessionsGuard
  ],
  entryComponents: [
    FollowupSessionsNewComponent,
    FollowupSessionsEditComponent,
    FollowupSessionsViewComponent
  ]
})

export class FollowupSessionsModule {
}
