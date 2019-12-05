import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ApprovalForEquippingSchoolsApprovalsListComponent } from './approval-for-equipping-schools-approvals-list/approval-for-equipping-schools-approvals-list.component';
import { ApprovalForEquippingSchoolsApprovalsEditComponent } from './approval-for-equipping-schools-approvals-edit/approval-for-equipping-schools-approvals-edit.component';
import { ApprovalForEquippingSchoolsApprovalsNewComponent } from './approval-for-equipping-schools-approvals-new/approval-for-equipping-schools-approvals-new.component';
import { ApprovalForEquippingSchoolsApprovalsViewComponent } from './approval-for-equipping-schools-approvals-view/approval-for-equipping-schools-approvals-view.component';
import { ApprovalForEquippingSchoolsApprovalsRoutingModule } from './approval-for-equipping-schools-approvals.routing.module';
import { ApprovalForEquippingSchoolsApprovalsService } from './shared/approval-for-equipping-schools-approvals.service';
import { ApprovalForEquippingSchoolsApprovalsGuard } from './shared/approval-for-equipping-schools-approvals.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ApprovalForEquippingSchoolsApprovalsListComponent,
    ApprovalForEquippingSchoolsApprovalsNewComponent,
    ApprovalForEquippingSchoolsApprovalsEditComponent,
    ApprovalForEquippingSchoolsApprovalsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ApprovalForEquippingSchoolsApprovalsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ApprovalForEquippingSchoolsApprovalsService,
    ApprovalForEquippingSchoolsApprovalsGuard
  ],
  entryComponents: [
    ApprovalForEquippingSchoolsApprovalsNewComponent,
    ApprovalForEquippingSchoolsApprovalsEditComponent,
    ApprovalForEquippingSchoolsApprovalsViewComponent
  ]
})

export class ApprovalForEquippingSchoolsApprovalsModule {
}
