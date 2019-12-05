import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GrantInformationListComponent } from './grant-information-list/grant-information-list.component';
import { GrantInformationEditComponent } from './grant-information-edit/grant-information-edit.component';
import { GrantInformationNewComponent } from './grant-information-new/grant-information-new.component';
import { GrantInformationViewComponent } from './grant-information-view/grant-information-view.component';
import { GrantInformationRoutingModule } from './grant-information.routing.module';
import { GrantInformationService } from './shared/grant-information.service';
import { GrantInformationGuard } from './shared/grant-information.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GrantInformationListComponent,
    GrantInformationNewComponent,
    GrantInformationEditComponent,
    GrantInformationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GrantInformationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GrantInformationService,
    GrantInformationGuard
  ],
  entryComponents: [
    GrantInformationNewComponent,
    GrantInformationEditComponent,
    GrantInformationViewComponent
  ]
})

export class GrantInformationModule {
}
