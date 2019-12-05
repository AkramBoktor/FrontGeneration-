import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TypicalAssayListsListComponent } from './typical-assay-lists-list/typical-assay-lists-list.component';
import { TypicalAssayListsEditComponent } from './typical-assay-lists-edit/typical-assay-lists-edit.component';
import { TypicalAssayListsNewComponent } from './typical-assay-lists-new/typical-assay-lists-new.component';
import { TypicalAssayListsViewComponent } from './typical-assay-lists-view/typical-assay-lists-view.component';
import { TypicalAssayListsRoutingModule } from './typical-assay-lists.routing.module';
import { TypicalAssayListsService } from './shared/typical-assay-lists.service';
import { TypicalAssayListsGuard } from './shared/typical-assay-lists.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TypicalAssayListsListComponent,
    TypicalAssayListsNewComponent,
    TypicalAssayListsEditComponent,
    TypicalAssayListsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TypicalAssayListsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TypicalAssayListsService,
    TypicalAssayListsGuard
  ],
  entryComponents: [
    TypicalAssayListsNewComponent,
    TypicalAssayListsEditComponent,
    TypicalAssayListsViewComponent
  ]
})

export class TypicalAssayListsModule {
}
