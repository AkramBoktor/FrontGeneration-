import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LawsuitSessionsArbitrationEditComponent } from './lawsuit-sessions-arbitration-edit/lawsuit-sessions-arbitration-edit.component';
import { LawsuitSessionsArbitrationListComponent } from './lawsuit-sessions-arbitration-list/lawsuit-sessions-arbitration-list.component';
import { LawsuitSessionsArbitrationNewComponent } from './lawsuit-sessions-arbitration-new/lawsuit-sessions-arbitration-new.component';
import { LawsuitSessionsArbitrationViewComponent } from './lawsuit-sessions-arbitration-view/lawsuit-sessions-arbitration-view.component';
import { LawsuitSessionsArbitrationRoutingModule } from './lawsuit-sessions-arbitration.routing.module';
import { LawsuitSessionsArbitrationGuard } from './shared/lawsuit-sessions-arbitration.guard';
import { LawsuitSessionsArbitrationService } from './shared/lawsuit-sessions-arbitration.service';

@NgModule({
  declarations: [
    LawsuitSessionsArbitrationListComponent,
    LawsuitSessionsArbitrationNewComponent,
    LawsuitSessionsArbitrationEditComponent,
    LawsuitSessionsArbitrationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LawsuitSessionsArbitrationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LawsuitSessionsArbitrationService,
    LawsuitSessionsArbitrationGuard
  ],
  entryComponents: [
    LawsuitSessionsArbitrationNewComponent,
    LawsuitSessionsArbitrationEditComponent,
    LawsuitSessionsArbitrationViewComponent
  ]
})

export class LawsuitSessionsArbitrationModule {
}
