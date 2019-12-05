import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CodeOfApprovedCompaniesRepresentativeListComponent } from './code-of-approved-companies-representative-list/code-of-approved-companies-representative-list.component';
import { CodeOfApprovedCompaniesRepresentativeEditComponent } from './code-of-approved-companies-representative-edit/code-of-approved-companies-representative-edit.component';
import { CodeOfApprovedCompaniesRepresentativeNewComponent } from './code-of-approved-companies-representative-new/code-of-approved-companies-representative-new.component';
import { CodeOfApprovedCompaniesRepresentativeViewComponent } from './code-of-approved-companies-representative-view/code-of-approved-companies-representative-view.component';
import { CodeOfApprovedCompaniesRepresentativeRoutingModule } from './code-of-approved-companies-representative.routing.module';
import { CodeOfApprovedCompaniesRepresentativeService } from './shared/code-of-approved-companies-representative.service';
import { CodeOfApprovedCompaniesRepresentativeGuard } from './shared/code-of-approved-companies-representative.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CodeOfApprovedCompaniesRepresentativeListComponent,
    CodeOfApprovedCompaniesRepresentativeNewComponent,
    CodeOfApprovedCompaniesRepresentativeEditComponent,
    CodeOfApprovedCompaniesRepresentativeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CodeOfApprovedCompaniesRepresentativeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CodeOfApprovedCompaniesRepresentativeService,
    CodeOfApprovedCompaniesRepresentativeGuard
  ],
  entryComponents: [
    CodeOfApprovedCompaniesRepresentativeNewComponent,
    CodeOfApprovedCompaniesRepresentativeEditComponent,
    CodeOfApprovedCompaniesRepresentativeViewComponent
  ]
})

export class CodeOfApprovedCompaniesRepresentativeModule {
}
