import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SocialWelfareForTheHeirsOfAnEmployeeListComponent } from './social-welfare-for-the-heirs-of-an-employee-list/social-welfare-for-the-heirs-of-an-employee-list.component';
import { SocialWelfareForTheHeirsOfAnEmployeeEditComponent } from './social-welfare-for-the-heirs-of-an-employee-edit/social-welfare-for-the-heirs-of-an-employee-edit.component';
import { SocialWelfareForTheHeirsOfAnEmployeeNewComponent } from './social-welfare-for-the-heirs-of-an-employee-new/social-welfare-for-the-heirs-of-an-employee-new.component';
import { SocialWelfareForTheHeirsOfAnEmployeeViewComponent } from './social-welfare-for-the-heirs-of-an-employee-view/social-welfare-for-the-heirs-of-an-employee-view.component';
import { SocialWelfareForTheHeirsOfAnEmployeeRoutingModule } from './social-welfare-for-the-heirs-of-an-employee.routing.module';
import { SocialWelfareForTheHeirsOfAnEmployeeService } from './shared/social-welfare-for-the-heirs-of-an-employee.service';
import { SocialWelfareForTheHeirsOfAnEmployeeGuard } from './shared/social-welfare-for-the-heirs-of-an-employee.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SocialWelfareForTheHeirsOfAnEmployeeListComponent,
    SocialWelfareForTheHeirsOfAnEmployeeNewComponent,
    SocialWelfareForTheHeirsOfAnEmployeeEditComponent,
    SocialWelfareForTheHeirsOfAnEmployeeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SocialWelfareForTheHeirsOfAnEmployeeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SocialWelfareForTheHeirsOfAnEmployeeService,
    SocialWelfareForTheHeirsOfAnEmployeeGuard
  ],
  entryComponents: [
    SocialWelfareForTheHeirsOfAnEmployeeNewComponent,
    SocialWelfareForTheHeirsOfAnEmployeeEditComponent,
    SocialWelfareForTheHeirsOfAnEmployeeViewComponent
  ]
})

export class SocialWelfareForTheHeirsOfAnEmployeeModule {
}
