import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PrivateSchoolApprovalListComponent } from './private-school-approval-list/private-school-approval-list.component';
import { PrivateSchoolApprovalEditComponent } from './private-school-approval-edit/private-school-approval-edit.component';
import { PrivateSchoolApprovalNewComponent } from './private-school-approval-new/private-school-approval-new.component';
import { PrivateSchoolApprovalViewComponent } from './private-school-approval-view/private-school-approval-view.component';
import { PrivateSchoolApprovalRoutingModule } from './private-school-approval.routing.module';
import { PrivateSchoolApprovalService } from './shared/private-school-approval.service';
import { PrivateSchoolApprovalGuard } from './shared/private-school-approval.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PrivateSchoolApprovalListComponent,
    PrivateSchoolApprovalNewComponent,
    PrivateSchoolApprovalEditComponent,
    PrivateSchoolApprovalViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PrivateSchoolApprovalRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PrivateSchoolApprovalService,
    PrivateSchoolApprovalGuard
  ],
  entryComponents: [
    PrivateSchoolApprovalNewComponent,
    PrivateSchoolApprovalEditComponent,
    PrivateSchoolApprovalViewComponent
  ]
})

export class PrivateSchoolApprovalModule {
}
