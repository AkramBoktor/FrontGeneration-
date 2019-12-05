import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ApprovalTypeListComponent } from './approval-type-list/approval-type-list.component';
import { ApprovalTypeEditComponent } from './approval-type-edit/approval-type-edit.component';
import { ApprovalTypeNewComponent } from './approval-type-new/approval-type-new.component';
import { ApprovalTypeViewComponent } from './approval-type-view/approval-type-view.component';
import { ApprovalTypeRoutingModule } from './approval-type.routing.module';
import { ApprovalTypeService } from './shared/approval-type.service';
import { ApprovalTypeGuard } from './shared/approval-type.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ApprovalTypeListComponent,
    ApprovalTypeNewComponent,
    ApprovalTypeEditComponent,
    ApprovalTypeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ApprovalTypeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ApprovalTypeService,
    ApprovalTypeGuard
  ],
  entryComponents: [
    ApprovalTypeNewComponent,
    ApprovalTypeEditComponent,
    ApprovalTypeViewComponent
  ]
})

export class ApprovalTypeModule {
}
