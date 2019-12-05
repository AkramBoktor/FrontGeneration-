import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TheListsRequiredToEquipAllSchoolsListComponent } from './the-lists-required-to-equip-all-schools-list/the-lists-required-to-equip-all-schools-list.component';
import { TheListsRequiredToEquipAllSchoolsEditComponent } from './the-lists-required-to-equip-all-schools-edit/the-lists-required-to-equip-all-schools-edit.component';
import { TheListsRequiredToEquipAllSchoolsNewComponent } from './the-lists-required-to-equip-all-schools-new/the-lists-required-to-equip-all-schools-new.component';
import { TheListsRequiredToEquipAllSchoolsViewComponent } from './the-lists-required-to-equip-all-schools-view/the-lists-required-to-equip-all-schools-view.component';
import { TheListsRequiredToEquipAllSchoolsRoutingModule } from './the-lists-required-to-equip-all-schools.routing.module';
import { TheListsRequiredToEquipAllSchoolsService } from './shared/the-lists-required-to-equip-all-schools.service';
import { TheListsRequiredToEquipAllSchoolsGuard } from './shared/the-lists-required-to-equip-all-schools.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TheListsRequiredToEquipAllSchoolsListComponent,
    TheListsRequiredToEquipAllSchoolsNewComponent,
    TheListsRequiredToEquipAllSchoolsEditComponent,
    TheListsRequiredToEquipAllSchoolsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TheListsRequiredToEquipAllSchoolsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TheListsRequiredToEquipAllSchoolsService,
    TheListsRequiredToEquipAllSchoolsGuard
  ],
  entryComponents: [
    TheListsRequiredToEquipAllSchoolsNewComponent,
    TheListsRequiredToEquipAllSchoolsEditComponent,
    TheListsRequiredToEquipAllSchoolsViewComponent
  ]
})

export class TheListsRequiredToEquipAllSchoolsModule {
}
