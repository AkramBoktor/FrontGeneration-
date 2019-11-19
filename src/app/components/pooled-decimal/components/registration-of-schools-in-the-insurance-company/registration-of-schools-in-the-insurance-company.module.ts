import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RegistrationOfSchoolsInTheInsuranceCompanyListComponent } from './registration-of-schools-in-the-insurance-company-list/registration-of-schools-in-the-insurance-company-list.component';
import { RegistrationOfSchoolsInTheInsuranceCompanyEditComponent } from './registration-of-schools-in-the-insurance-company-edit/registration-of-schools-in-the-insurance-company-edit.component';
import { RegistrationOfSchoolsInTheInsuranceCompanyNewComponent } from './registration-of-schools-in-the-insurance-company-new/registration-of-schools-in-the-insurance-company-new.component';
import { RegistrationOfSchoolsInTheInsuranceCompanyViewComponent } from './registration-of-schools-in-the-insurance-company-view/registration-of-schools-in-the-insurance-company-view.component';
import { RegistrationOfSchoolsInTheInsuranceCompanyRoutingModule } from './registration-of-schools-in-the-insurance-company.routing.module';
import { RegistrationOfSchoolsInTheInsuranceCompanyService } from './shared/registration-of-schools-in-the-insurance-company.service';
import { RegistrationOfSchoolsInTheInsuranceCompanyGuard } from './shared/registration-of-schools-in-the-insurance-company.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RegistrationOfSchoolsInTheInsuranceCompanyListComponent,
    RegistrationOfSchoolsInTheInsuranceCompanyNewComponent,
    RegistrationOfSchoolsInTheInsuranceCompanyEditComponent,
    RegistrationOfSchoolsInTheInsuranceCompanyViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RegistrationOfSchoolsInTheInsuranceCompanyRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RegistrationOfSchoolsInTheInsuranceCompanyService,
    RegistrationOfSchoolsInTheInsuranceCompanyGuard
  ],
  entryComponents: [
    RegistrationOfSchoolsInTheInsuranceCompanyNewComponent,
    RegistrationOfSchoolsInTheInsuranceCompanyEditComponent,
    RegistrationOfSchoolsInTheInsuranceCompanyViewComponent
  ]
})

export class RegistrationOfSchoolsInTheInsuranceCompanyModule {
}
