import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RegisterANewSubsidyCodeListComponent } from './register-a-new-subsidy-code-list/register-a-new-subsidy-code-list.component';
import { RegisterANewSubsidyCodeEditComponent } from './register-a-new-subsidy-code-edit/register-a-new-subsidy-code-edit.component';
import { RegisterANewSubsidyCodeNewComponent } from './register-a-new-subsidy-code-new/register-a-new-subsidy-code-new.component';
import { RegisterANewSubsidyCodeViewComponent } from './register-a-new-subsidy-code-view/register-a-new-subsidy-code-view.component';
import { RegisterANewSubsidyCodeRoutingModule } from './register-a-new-subsidy-code.routing.module';
import { RegisterANewSubsidyCodeService } from './shared/register-a-new-subsidy-code.service';
import { RegisterANewSubsidyCodeGuard } from './shared/register-a-new-subsidy-code.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RegisterANewSubsidyCodeListComponent,
    RegisterANewSubsidyCodeNewComponent,
    RegisterANewSubsidyCodeEditComponent,
    RegisterANewSubsidyCodeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RegisterANewSubsidyCodeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RegisterANewSubsidyCodeService,
    RegisterANewSubsidyCodeGuard
  ],
  entryComponents: [
    RegisterANewSubsidyCodeNewComponent,
    RegisterANewSubsidyCodeEditComponent,
    RegisterANewSubsidyCodeViewComponent
  ]
})

export class RegisterANewSubsidyCodeModule {
}
