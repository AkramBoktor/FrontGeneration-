import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PeopleAssemblyApprovalListComponent } from './people-assembly-approval-list/people-assembly-approval-list.component';
import { PeopleAssemblyApprovalEditComponent } from './people-assembly-approval-edit/people-assembly-approval-edit.component';
import { PeopleAssemblyApprovalNewComponent } from './people-assembly-approval-new/people-assembly-approval-new.component';
import { PeopleAssemblyApprovalViewComponent } from './people-assembly-approval-view/people-assembly-approval-view.component';
import { PeopleAssemblyApprovalRoutingModule } from './people-assembly-approval.routing.module';
import { PeopleAssemblyApprovalService } from './shared/people-assembly-approval.service';
import { PeopleAssemblyApprovalGuard } from './shared/people-assembly-approval.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PeopleAssemblyApprovalListComponent,
    PeopleAssemblyApprovalNewComponent,
    PeopleAssemblyApprovalEditComponent,
    PeopleAssemblyApprovalViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PeopleAssemblyApprovalRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PeopleAssemblyApprovalService,
    PeopleAssemblyApprovalGuard
  ],
  entryComponents: [
    PeopleAssemblyApprovalNewComponent,
    PeopleAssemblyApprovalEditComponent,
    PeopleAssemblyApprovalViewComponent
  ]
})

export class PeopleAssemblyApprovalModule {
}
