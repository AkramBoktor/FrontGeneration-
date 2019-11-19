import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SocialSecurityForEmployeeFamilyListComponent } from './social-security-for-employee-family-list/social-security-for-employee-family-list.component';
import { SocialSecurityForEmployeeFamilyEditComponent } from './social-security-for-employee-family-edit/social-security-for-employee-family-edit.component';
import { SocialSecurityForEmployeeFamilyNewComponent } from './social-security-for-employee-family-new/social-security-for-employee-family-new.component';
import { SocialSecurityForEmployeeFamilyViewComponent } from './social-security-for-employee-family-view/social-security-for-employee-family-view.component';
import { SocialSecurityForEmployeeFamilyRoutingModule } from './social-security-for-employee-family.routing.module';
import { SocialSecurityForEmployeeFamilyService } from './shared/social-security-for-employee-family.service';
import { SocialSecurityForEmployeeFamilyGuard } from './shared/social-security-for-employee-family.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SocialSecurityForEmployeeFamilyListComponent,
    SocialSecurityForEmployeeFamilyNewComponent,
    SocialSecurityForEmployeeFamilyEditComponent,
    SocialSecurityForEmployeeFamilyViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SocialSecurityForEmployeeFamilyRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SocialSecurityForEmployeeFamilyService,
    SocialSecurityForEmployeeFamilyGuard
  ],
  entryComponents: [
    SocialSecurityForEmployeeFamilyNewComponent,
    SocialSecurityForEmployeeFamilyEditComponent,
    SocialSecurityForEmployeeFamilyViewComponent
  ]
})

export class SocialSecurityForEmployeeFamilyModule {
}
