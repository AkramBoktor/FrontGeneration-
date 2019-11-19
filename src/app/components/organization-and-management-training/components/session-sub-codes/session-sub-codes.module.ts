import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SessionSubCodesListComponent } from './session-sub-codes-list/session-sub-codes-list.component';
import { SessionSubCodesEditComponent } from './session-sub-codes-edit/session-sub-codes-edit.component';
import { SessionSubCodesNewComponent } from './session-sub-codes-new/session-sub-codes-new.component';
import { SessionSubCodesViewComponent } from './session-sub-codes-view/session-sub-codes-view.component';
import { SessionSubCodesRoutingModule } from './session-sub-codes.routing.module';
import { SessionSubCodesService } from './shared/session-sub-codes.service';
import { SessionSubCodesGuard } from './shared/session-sub-codes.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SessionSubCodesListComponent,
    SessionSubCodesNewComponent,
    SessionSubCodesEditComponent,
    SessionSubCodesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SessionSubCodesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SessionSubCodesService,
    SessionSubCodesGuard
  ],
  entryComponents: [
    SessionSubCodesNewComponent,
    SessionSubCodesEditComponent,
    SessionSubCodesViewComponent
  ]
})

export class SessionSubCodesModule {
}
