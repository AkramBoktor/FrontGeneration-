import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LinkItemToTimeTableListComponent } from './link-item-to-time-table-list/link-item-to-time-table-list.component';
import { LinkItemToTimeTableEditComponent } from './link-item-to-time-table-edit/link-item-to-time-table-edit.component';
import { LinkItemToTimeTableNewComponent } from './link-item-to-time-table-new/link-item-to-time-table-new.component';
import { LinkItemToTimeTableViewComponent } from './link-item-to-time-table-view/link-item-to-time-table-view.component';
import { LinkItemToTimeTableRoutingModule } from './link-item-to-time-table.routing.module';
import { LinkItemToTimeTableService } from './shared/link-item-to-time-table.service';
import { LinkItemToTimeTableGuard } from './shared/link-item-to-time-table.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LinkItemToTimeTableListComponent,
    LinkItemToTimeTableNewComponent,
    LinkItemToTimeTableEditComponent,
    LinkItemToTimeTableViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LinkItemToTimeTableRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LinkItemToTimeTableService,
    LinkItemToTimeTableGuard
  ],
  entryComponents: [
    LinkItemToTimeTableNewComponent,
    LinkItemToTimeTableEditComponent,
    LinkItemToTimeTableViewComponent
  ]
})

export class LinkItemToTimeTableModule {
}
