import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CodesOfReasonForTerminationListComponent } from './codes-of-reason-for-termination-list/codes-of-reason-for-termination-list.component';
import { CodesOfReasonForTerminationEditComponent } from './codes-of-reason-for-termination-edit/codes-of-reason-for-termination-edit.component';
import { CodesOfReasonForTerminationNewComponent } from './codes-of-reason-for-termination-new/codes-of-reason-for-termination-new.component';
import { CodesOfReasonForTerminationViewComponent } from './codes-of-reason-for-termination-view/codes-of-reason-for-termination-view.component';
import { CodesOfReasonForTerminationRoutingModule } from './codes-of-reason-for-termination.routing.module';
import { CodesOfReasonForTerminationService } from './shared/codes-of-reason-for-termination.service';
import { CodesOfReasonForTerminationGuard } from './shared/codes-of-reason-for-termination.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CodesOfReasonForTerminationListComponent,
    CodesOfReasonForTerminationNewComponent,
    CodesOfReasonForTerminationEditComponent,
    CodesOfReasonForTerminationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CodesOfReasonForTerminationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CodesOfReasonForTerminationService,
    CodesOfReasonForTerminationGuard
  ],
  entryComponents: [
    CodesOfReasonForTerminationNewComponent,
    CodesOfReasonForTerminationEditComponent,
    CodesOfReasonForTerminationViewComponent
  ]
})

export class CodesOfReasonForTerminationModule {
}
