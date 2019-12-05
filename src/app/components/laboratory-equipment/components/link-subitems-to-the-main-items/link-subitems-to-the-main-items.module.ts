import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LinkSubitemsToTheMainItemsListComponent } from './link-subitems-to-the-main-items-list/link-subitems-to-the-main-items-list.component';
import { LinkSubitemsToTheMainItemsEditComponent } from './link-subitems-to-the-main-items-edit/link-subitems-to-the-main-items-edit.component';
import { LinkSubitemsToTheMainItemsNewComponent } from './link-subitems-to-the-main-items-new/link-subitems-to-the-main-items-new.component';
import { LinkSubitemsToTheMainItemsViewComponent } from './link-subitems-to-the-main-items-view/link-subitems-to-the-main-items-view.component';
import { LinkSubitemsToTheMainItemsRoutingModule } from './link-subitems-to-the-main-items.routing.module';
import { LinkSubitemsToTheMainItemsService } from './shared/link-subitems-to-the-main-items.service';
import { LinkSubitemsToTheMainItemsGuard } from './shared/link-subitems-to-the-main-items.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LinkSubitemsToTheMainItemsListComponent,
    LinkSubitemsToTheMainItemsNewComponent,
    LinkSubitemsToTheMainItemsEditComponent,
    LinkSubitemsToTheMainItemsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LinkSubitemsToTheMainItemsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LinkSubitemsToTheMainItemsService,
    LinkSubitemsToTheMainItemsGuard
  ],
  entryComponents: [
    LinkSubitemsToTheMainItemsNewComponent,
    LinkSubitemsToTheMainItemsEditComponent,
    LinkSubitemsToTheMainItemsViewComponent
  ]
})

export class LinkSubitemsToTheMainItemsModule {
}
