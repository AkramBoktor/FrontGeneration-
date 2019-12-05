import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { StatementsByTheAuditCommitteeListComponent } from './statements-by-the-audit-committee-list/statements-by-the-audit-committee-list.component';
import { StatementsByTheAuditCommitteeEditComponent } from './statements-by-the-audit-committee-edit/statements-by-the-audit-committee-edit.component';
import { StatementsByTheAuditCommitteeNewComponent } from './statements-by-the-audit-committee-new/statements-by-the-audit-committee-new.component';
import { StatementsByTheAuditCommitteeViewComponent } from './statements-by-the-audit-committee-view/statements-by-the-audit-committee-view.component';
import { StatementsByTheAuditCommitteeRoutingModule } from './statements-by-the-audit-committee.routing.module';
import { StatementsByTheAuditCommitteeService } from './shared/statements-by-the-audit-committee.service';
import { StatementsByTheAuditCommitteeGuard } from './shared/statements-by-the-audit-committee.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    StatementsByTheAuditCommitteeListComponent,
    StatementsByTheAuditCommitteeNewComponent,
    StatementsByTheAuditCommitteeEditComponent,
    StatementsByTheAuditCommitteeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    StatementsByTheAuditCommitteeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    StatementsByTheAuditCommitteeService,
    StatementsByTheAuditCommitteeGuard
  ],
  entryComponents: [
    StatementsByTheAuditCommitteeNewComponent,
    StatementsByTheAuditCommitteeEditComponent,
    StatementsByTheAuditCommitteeViewComponent
  ]
})

export class StatementsByTheAuditCommitteeModule {
}
