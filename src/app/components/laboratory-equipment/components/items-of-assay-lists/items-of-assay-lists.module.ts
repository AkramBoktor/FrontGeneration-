import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ItemsOfAssayListsListComponent } from './items-of-assay-lists-list/items-of-assay-lists-list.component';
import { ItemsOfAssayListsEditComponent } from './items-of-assay-lists-edit/items-of-assay-lists-edit.component';
import { ItemsOfAssayListsNewComponent } from './items-of-assay-lists-new/items-of-assay-lists-new.component';
import { ItemsOfAssayListsViewComponent } from './items-of-assay-lists-view/items-of-assay-lists-view.component';
import { ItemsOfAssayListsRoutingModule } from './items-of-assay-lists.routing.module';
import { ItemsOfAssayListsService } from './shared/items-of-assay-lists.service';
import { ItemsOfAssayListsGuard } from './shared/items-of-assay-lists.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ItemsOfAssayListsListComponent,
    ItemsOfAssayListsNewComponent,
    ItemsOfAssayListsEditComponent,
    ItemsOfAssayListsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ItemsOfAssayListsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ItemsOfAssayListsService,
    ItemsOfAssayListsGuard
  ],
  entryComponents: [
    ItemsOfAssayListsNewComponent,
    ItemsOfAssayListsEditComponent,
    ItemsOfAssayListsViewComponent
  ]
})

export class ItemsOfAssayListsModule {
}
