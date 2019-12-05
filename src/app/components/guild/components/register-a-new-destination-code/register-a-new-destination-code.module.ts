import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RegisterANewDestinationCodeListComponent } from './register-a-new-destination-code-list/register-a-new-destination-code-list.component';
import { RegisterANewDestinationCodeEditComponent } from './register-a-new-destination-code-edit/register-a-new-destination-code-edit.component';
import { RegisterANewDestinationCodeNewComponent } from './register-a-new-destination-code-new/register-a-new-destination-code-new.component';
import { RegisterANewDestinationCodeViewComponent } from './register-a-new-destination-code-view/register-a-new-destination-code-view.component';
import { RegisterANewDestinationCodeRoutingModule } from './register-a-new-destination-code.routing.module';
import { RegisterANewDestinationCodeService } from './shared/register-a-new-destination-code.service';
import { RegisterANewDestinationCodeGuard } from './shared/register-a-new-destination-code.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RegisterANewDestinationCodeListComponent,
    RegisterANewDestinationCodeNewComponent,
    RegisterANewDestinationCodeEditComponent,
    RegisterANewDestinationCodeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RegisterANewDestinationCodeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RegisterANewDestinationCodeService,
    RegisterANewDestinationCodeGuard
  ],
  entryComponents: [
    RegisterANewDestinationCodeNewComponent,
    RegisterANewDestinationCodeEditComponent,
    RegisterANewDestinationCodeViewComponent
  ]
})

export class RegisterANewDestinationCodeModule {
}
