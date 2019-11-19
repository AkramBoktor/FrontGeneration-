import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DrugsInformationListComponent } from './drugs-information-list/drugs-information-list.component';
import { DrugsInformationEditComponent } from './drugs-information-edit/drugs-information-edit.component';
import { DrugsInformationNewComponent } from './drugs-information-new/drugs-information-new.component';
import { DrugsInformationViewComponent } from './drugs-information-view/drugs-information-view.component';
import { DrugsInformationRoutingModule } from './drugs-information.routing.module';
import { DrugsInformationService } from './shared/drugs-information.service';
import { DrugsInformationGuard } from './shared/drugs-information.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DrugsInformationListComponent,
    DrugsInformationNewComponent,
    DrugsInformationEditComponent,
    DrugsInformationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DrugsInformationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DrugsInformationService,
    DrugsInformationGuard
  ],
  entryComponents: [
    DrugsInformationNewComponent,
    DrugsInformationEditComponent,
    DrugsInformationViewComponent
  ]
})

export class DrugsInformationModule {
}
