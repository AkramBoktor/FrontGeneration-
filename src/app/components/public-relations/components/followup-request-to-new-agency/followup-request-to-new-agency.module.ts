import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FollowupRequestToNewAgencyListComponent } from './followup-request-to-new-agency-list/followup-request-to-new-agency-list.component';
import { FollowupRequestToNewAgencyEditComponent } from './followup-request-to-new-agency-edit/followup-request-to-new-agency-edit.component';
import { FollowupRequestToNewAgencyNewComponent } from './followup-request-to-new-agency-new/followup-request-to-new-agency-new.component';
import { FollowupRequestToNewAgencyViewComponent } from './followup-request-to-new-agency-view/followup-request-to-new-agency-view.component';
import { FollowupRequestToNewAgencyRoutingModule } from './followup-request-to-new-agency.routing.module';
import { FollowupRequestToNewAgencyService } from './shared/followup-request-to-new-agency.service';
import { FollowupRequestToNewAgencyGuard } from './shared/followup-request-to-new-agency.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FollowupRequestToNewAgencyListComponent,
    FollowupRequestToNewAgencyNewComponent,
    FollowupRequestToNewAgencyEditComponent,
    FollowupRequestToNewAgencyViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FollowupRequestToNewAgencyRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FollowupRequestToNewAgencyService,
    FollowupRequestToNewAgencyGuard
  ],
  entryComponents: [
    FollowupRequestToNewAgencyNewComponent,
    FollowupRequestToNewAgencyEditComponent,
    FollowupRequestToNewAgencyViewComponent
  ]
})

export class FollowupRequestToNewAgencyModule {
}
