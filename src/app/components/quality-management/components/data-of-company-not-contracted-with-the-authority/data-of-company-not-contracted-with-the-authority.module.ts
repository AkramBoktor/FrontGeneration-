import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataOfCompanyNotContractedWithTheAuthorityListComponent } from './data-of-company-not-contracted-with-the-authority-list/data-of-company-not-contracted-with-the-authority-list.component';
import { DataOfCompanyNotContractedWithTheAuthorityEditComponent } from './data-of-company-not-contracted-with-the-authority-edit/data-of-company-not-contracted-with-the-authority-edit.component';
import { DataOfCompanyNotContractedWithTheAuthorityNewComponent } from './data-of-company-not-contracted-with-the-authority-new/data-of-company-not-contracted-with-the-authority-new.component';
import { DataOfCompanyNotContractedWithTheAuthorityViewComponent } from './data-of-company-not-contracted-with-the-authority-view/data-of-company-not-contracted-with-the-authority-view.component';
import { DataOfCompanyNotContractedWithTheAuthorityRoutingModule } from './data-of-company-not-contracted-with-the-authority.routing.module';
import { DataOfCompanyNotContractedWithTheAuthorityService } from './shared/data-of-company-not-contracted-with-the-authority.service';
import { DataOfCompanyNotContractedWithTheAuthorityGuard } from './shared/data-of-company-not-contracted-with-the-authority.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataOfCompanyNotContractedWithTheAuthorityListComponent,
    DataOfCompanyNotContractedWithTheAuthorityNewComponent,
    DataOfCompanyNotContractedWithTheAuthorityEditComponent,
    DataOfCompanyNotContractedWithTheAuthorityViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataOfCompanyNotContractedWithTheAuthorityRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataOfCompanyNotContractedWithTheAuthorityService,
    DataOfCompanyNotContractedWithTheAuthorityGuard
  ],
  entryComponents: [
    DataOfCompanyNotContractedWithTheAuthorityNewComponent,
    DataOfCompanyNotContractedWithTheAuthorityEditComponent,
    DataOfCompanyNotContractedWithTheAuthorityViewComponent
  ]
})

export class DataOfCompanyNotContractedWithTheAuthorityModule {
}
