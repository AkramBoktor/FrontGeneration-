import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RegisterTheMovementOfReadyToiletsListComponent } from './register-the-movement-of-ready-toilets-list/register-the-movement-of-ready-toilets-list.component';
import { RegisterTheMovementOfReadyToiletsEditComponent } from './register-the-movement-of-ready-toilets-edit/register-the-movement-of-ready-toilets-edit.component';
import { RegisterTheMovementOfReadyToiletsNewComponent } from './register-the-movement-of-ready-toilets-new/register-the-movement-of-ready-toilets-new.component';
import { RegisterTheMovementOfReadyToiletsViewComponent } from './register-the-movement-of-ready-toilets-view/register-the-movement-of-ready-toilets-view.component';
import { RegisterTheMovementOfReadyToiletsRoutingModule } from './register-the-movement-of-ready-toilets.routing.module';
import { RegisterTheMovementOfReadyToiletsService } from './shared/register-the-movement-of-ready-toilets.service';
import { RegisterTheMovementOfReadyToiletsGuard } from './shared/register-the-movement-of-ready-toilets.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RegisterTheMovementOfReadyToiletsListComponent,
    RegisterTheMovementOfReadyToiletsNewComponent,
    RegisterTheMovementOfReadyToiletsEditComponent,
    RegisterTheMovementOfReadyToiletsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RegisterTheMovementOfReadyToiletsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RegisterTheMovementOfReadyToiletsService,
    RegisterTheMovementOfReadyToiletsGuard
  ],
  entryComponents: [
    RegisterTheMovementOfReadyToiletsNewComponent,
    RegisterTheMovementOfReadyToiletsEditComponent,
    RegisterTheMovementOfReadyToiletsViewComponent
  ]
})

export class RegisterTheMovementOfReadyToiletsModule {
}
