import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ProducingMaterialForApprovedCompaniesListComponent } from './producing-material-for-approved-companies-list/producing-material-for-approved-companies-list.component';
import { ProducingMaterialForApprovedCompaniesEditComponent } from './producing-material-for-approved-companies-edit/producing-material-for-approved-companies-edit.component';
import { ProducingMaterialForApprovedCompaniesNewComponent } from './producing-material-for-approved-companies-new/producing-material-for-approved-companies-new.component';
import { ProducingMaterialForApprovedCompaniesViewComponent } from './producing-material-for-approved-companies-view/producing-material-for-approved-companies-view.component';
import { ProducingMaterialForApprovedCompaniesRoutingModule } from './producing-material-for-approved-companies.routing.module';
import { ProducingMaterialForApprovedCompaniesService } from './shared/producing-material-for-approved-companies.service';
import { ProducingMaterialForApprovedCompaniesGuard } from './shared/producing-material-for-approved-companies.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ProducingMaterialForApprovedCompaniesListComponent,
    ProducingMaterialForApprovedCompaniesNewComponent,
    ProducingMaterialForApprovedCompaniesEditComponent,
    ProducingMaterialForApprovedCompaniesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ProducingMaterialForApprovedCompaniesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ProducingMaterialForApprovedCompaniesService,
    ProducingMaterialForApprovedCompaniesGuard
  ],
  entryComponents: [
    ProducingMaterialForApprovedCompaniesNewComponent,
    ProducingMaterialForApprovedCompaniesEditComponent,
    ProducingMaterialForApprovedCompaniesViewComponent
  ]
})

export class ProducingMaterialForApprovedCompaniesModule {
}
