import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CodeOfVariousActivityOfApprovedCompaniesListComponent } from './code-of-various-activity-of-approved-companies-list/code-of-various-activity-of-approved-companies-list.component';
import { CodeOfVariousActivityOfApprovedCompaniesEditComponent } from './code-of-various-activity-of-approved-companies-edit/code-of-various-activity-of-approved-companies-edit.component';
import { CodeOfVariousActivityOfApprovedCompaniesNewComponent } from './code-of-various-activity-of-approved-companies-new/code-of-various-activity-of-approved-companies-new.component';
import { CodeOfVariousActivityOfApprovedCompaniesViewComponent } from './code-of-various-activity-of-approved-companies-view/code-of-various-activity-of-approved-companies-view.component';
import { CodeOfVariousActivityOfApprovedCompaniesRoutingModule } from './code-of-various-activity-of-approved-companies.routing.module';
import { CodeOfVariousActivityOfApprovedCompaniesService } from './shared/code-of-various-activity-of-approved-companies.service';
import { CodeOfVariousActivityOfApprovedCompaniesGuard } from './shared/code-of-various-activity-of-approved-companies.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CodeOfVariousActivityOfApprovedCompaniesListComponent,
    CodeOfVariousActivityOfApprovedCompaniesNewComponent,
    CodeOfVariousActivityOfApprovedCompaniesEditComponent,
    CodeOfVariousActivityOfApprovedCompaniesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CodeOfVariousActivityOfApprovedCompaniesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CodeOfVariousActivityOfApprovedCompaniesService,
    CodeOfVariousActivityOfApprovedCompaniesGuard
  ],
  entryComponents: [
    CodeOfVariousActivityOfApprovedCompaniesNewComponent,
    CodeOfVariousActivityOfApprovedCompaniesEditComponent,
    CodeOfVariousActivityOfApprovedCompaniesViewComponent
  ]
})

export class CodeOfVariousActivityOfApprovedCompaniesModule {
}
