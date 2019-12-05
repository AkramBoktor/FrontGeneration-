import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LinkItemsToObjectCodesListComponent } from './link-items-to-object-codes-list/link-items-to-object-codes-list.component';
import { LinkItemsToObjectCodesEditComponent } from './link-items-to-object-codes-edit/link-items-to-object-codes-edit.component';
import { LinkItemsToObjectCodesNewComponent } from './link-items-to-object-codes-new/link-items-to-object-codes-new.component';
import { LinkItemsToObjectCodesViewComponent } from './link-items-to-object-codes-view/link-items-to-object-codes-view.component';
import { LinkItemsToObjectCodesRoutingModule } from './link-items-to-object-codes.routing.module';
import { LinkItemsToObjectCodesService } from './shared/link-items-to-object-codes.service';
import { LinkItemsToObjectCodesGuard } from './shared/link-items-to-object-codes.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LinkItemsToObjectCodesListComponent,
    LinkItemsToObjectCodesNewComponent,
    LinkItemsToObjectCodesEditComponent,
    LinkItemsToObjectCodesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LinkItemsToObjectCodesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LinkItemsToObjectCodesService,
    LinkItemsToObjectCodesGuard
  ],
  entryComponents: [
    LinkItemsToObjectCodesNewComponent,
    LinkItemsToObjectCodesEditComponent,
    LinkItemsToObjectCodesViewComponent
  ]
})

export class LinkItemsToObjectCodesModule {
}
