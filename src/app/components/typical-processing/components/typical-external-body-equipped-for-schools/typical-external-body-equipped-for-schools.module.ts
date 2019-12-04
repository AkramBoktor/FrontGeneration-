import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TypicalExternalBodyEquippedForSchoolsListComponent } from './typical-external-body-equipped-for-schools-list/typical-external-body-equipped-for-schools-list.component';
import { TypicalExternalBodyEquippedForSchoolsEditComponent } from './typical-external-body-equipped-for-schools-edit/typical-external-body-equipped-for-schools-edit.component';
import { TypicalExternalBodyEquippedForSchoolsNewComponent } from './typical-external-body-equipped-for-schools-new/typical-external-body-equipped-for-schools-new.component';
import { TypicalExternalBodyEquippedForSchoolsViewComponent } from './typical-external-body-equipped-for-schools-view/typical-external-body-equipped-for-schools-view.component';
import { TypicalExternalBodyEquippedForSchoolsRoutingModule } from './typical-external-body-equipped-for-schools.routing.module';
import { TypicalExternalBodyEquippedForSchoolsService } from './shared/typical-external-body-equipped-for-schools.service';
import { TypicalExternalBodyEquippedForSchoolsGuard } from './shared/typical-external-body-equipped-for-schools.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TypicalExternalBodyEquippedForSchoolsListComponent,
    TypicalExternalBodyEquippedForSchoolsNewComponent,
    TypicalExternalBodyEquippedForSchoolsEditComponent,
    TypicalExternalBodyEquippedForSchoolsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TypicalExternalBodyEquippedForSchoolsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TypicalExternalBodyEquippedForSchoolsService,
    TypicalExternalBodyEquippedForSchoolsGuard
  ],
  entryComponents: [
    TypicalExternalBodyEquippedForSchoolsNewComponent,
    TypicalExternalBodyEquippedForSchoolsEditComponent,
    TypicalExternalBodyEquippedForSchoolsViewComponent
  ]
})

export class TypicalExternalBodyEquippedForSchoolsModule {
}
