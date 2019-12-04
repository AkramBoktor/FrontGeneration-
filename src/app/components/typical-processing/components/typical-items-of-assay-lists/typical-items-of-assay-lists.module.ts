import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TypicalItemsOfAssayListsListComponent } from './typical-items-of-assay-lists-list/typical-items-of-assay-lists-list.component';
import { TypicalItemsOfAssayListsEditComponent } from './typical-items-of-assay-lists-edit/typical-items-of-assay-lists-edit.component';
import { TypicalItemsOfAssayListsNewComponent } from './typical-items-of-assay-lists-new/typical-items-of-assay-lists-new.component';
import { TypicalItemsOfAssayListsViewComponent } from './typical-items-of-assay-lists-view/typical-items-of-assay-lists-view.component';
import { TypicalItemsOfAssayListsRoutingModule } from './typical-items-of-assay-lists.routing.module';
import { TypicalItemsOfAssayListsService } from './shared/typical-items-of-assay-lists.service';
import { TypicalItemsOfAssayListsGuard } from './shared/typical-items-of-assay-lists.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TypicalItemsOfAssayListsListComponent,
    TypicalItemsOfAssayListsNewComponent,
    TypicalItemsOfAssayListsEditComponent,
    TypicalItemsOfAssayListsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TypicalItemsOfAssayListsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TypicalItemsOfAssayListsService,
    TypicalItemsOfAssayListsGuard
  ],
  entryComponents: [
    TypicalItemsOfAssayListsNewComponent,
    TypicalItemsOfAssayListsEditComponent,
    TypicalItemsOfAssayListsViewComponent
  ]
})

export class TypicalItemsOfAssayListsModule {
}
