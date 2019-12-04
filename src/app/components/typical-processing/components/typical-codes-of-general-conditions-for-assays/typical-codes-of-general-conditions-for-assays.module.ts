import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TypicalCodesOfGeneralConditionsForAssaysListComponent } from './typical-codes-of-general-conditions-for-assays-list/typical-codes-of-general-conditions-for-assays-list.component';
import { TypicalCodesOfGeneralConditionsForAssaysEditComponent } from './typical-codes-of-general-conditions-for-assays-edit/typical-codes-of-general-conditions-for-assays-edit.component';
import { TypicalCodesOfGeneralConditionsForAssaysNewComponent } from './typical-codes-of-general-conditions-for-assays-new/typical-codes-of-general-conditions-for-assays-new.component';
import { TypicalCodesOfGeneralConditionsForAssaysViewComponent } from './typical-codes-of-general-conditions-for-assays-view/typical-codes-of-general-conditions-for-assays-view.component';
import { TypicalCodesOfGeneralConditionsForAssaysRoutingModule } from './typical-codes-of-general-conditions-for-assays.routing.module';
import { TypicalCodesOfGeneralConditionsForAssaysService } from './shared/typical-codes-of-general-conditions-for-assays.service';
import { TypicalCodesOfGeneralConditionsForAssaysGuard } from './shared/typical-codes-of-general-conditions-for-assays.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TypicalCodesOfGeneralConditionsForAssaysListComponent,
    TypicalCodesOfGeneralConditionsForAssaysNewComponent,
    TypicalCodesOfGeneralConditionsForAssaysEditComponent,
    TypicalCodesOfGeneralConditionsForAssaysViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TypicalCodesOfGeneralConditionsForAssaysRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TypicalCodesOfGeneralConditionsForAssaysService,
    TypicalCodesOfGeneralConditionsForAssaysGuard
  ],
  entryComponents: [
    TypicalCodesOfGeneralConditionsForAssaysNewComponent,
    TypicalCodesOfGeneralConditionsForAssaysEditComponent,
    TypicalCodesOfGeneralConditionsForAssaysViewComponent
  ]
})

export class TypicalCodesOfGeneralConditionsForAssaysModule {
}
