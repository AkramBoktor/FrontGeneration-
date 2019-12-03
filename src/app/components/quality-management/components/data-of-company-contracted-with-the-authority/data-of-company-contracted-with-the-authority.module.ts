import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataOfCompanyContractedWithTheAuthorityListComponent } from './data-of-company-contracted-with-the-authority-list/data-of-company-contracted-with-the-authority-list.component';
import { DataOfCompanyContractedWithTheAuthorityEditComponent } from './data-of-company-contracted-with-the-authority-edit/data-of-company-contracted-with-the-authority-edit.component';
import { DataOfCompanyContractedWithTheAuthorityNewComponent } from './data-of-company-contracted-with-the-authority-new/data-of-company-contracted-with-the-authority-new.component';
import { DataOfCompanyContractedWithTheAuthorityViewComponent } from './data-of-company-contracted-with-the-authority-view/data-of-company-contracted-with-the-authority-view.component';
import { DataOfCompanyContractedWithTheAuthorityRoutingModule } from './data-of-company-contracted-with-the-authority.routing.module';
import { DataOfCompanyContractedWithTheAuthorityService } from './shared/data-of-company-contracted-with-the-authority.service';
import { DataOfCompanyContractedWithTheAuthorityGuard } from './shared/data-of-company-contracted-with-the-authority.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataOfCompanyContractedWithTheAuthorityListComponent,
    DataOfCompanyContractedWithTheAuthorityNewComponent,
    DataOfCompanyContractedWithTheAuthorityEditComponent,
    DataOfCompanyContractedWithTheAuthorityViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataOfCompanyContractedWithTheAuthorityRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataOfCompanyContractedWithTheAuthorityService,
    DataOfCompanyContractedWithTheAuthorityGuard
  ],
  entryComponents: [
    DataOfCompanyContractedWithTheAuthorityNewComponent,
    DataOfCompanyContractedWithTheAuthorityEditComponent,
    DataOfCompanyContractedWithTheAuthorityViewComponent
  ]
})

export class DataOfCompanyContractedWithTheAuthorityModule {
}
