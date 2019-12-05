import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssayListsListComponent } from './assay-lists-list/assay-lists-list.component';
import { AssayListsEditComponent } from './assay-lists-edit/assay-lists-edit.component';
import { AssayListsNewComponent } from './assay-lists-new/assay-lists-new.component';
import { AssayListsViewComponent } from './assay-lists-view/assay-lists-view.component';
import { AssayListsRoutingModule } from './assay-lists.routing.module';
import { AssayListsService } from './shared/assay-lists.service';
import { AssayListsGuard } from './shared/assay-lists.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssayListsListComponent,
    AssayListsNewComponent,
    AssayListsEditComponent,
    AssayListsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssayListsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssayListsService,
    AssayListsGuard
  ],
  entryComponents: [
    AssayListsNewComponent,
    AssayListsEditComponent,
    AssayListsViewComponent
  ]
})

export class AssayListsModule {
}
