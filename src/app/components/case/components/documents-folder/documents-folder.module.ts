import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DocumentsFolderEditComponent } from './documents-folder-edit/documents-folder-edit.component';
import { DocumentsFolderListComponent } from './documents-folder-list/documents-folder-list.component';
import { DocumentsFolderNewComponent } from './documents-folder-new/documents-folder-new.component';
import { DocumentsFolderViewComponent } from './documents-folder-view/documents-folder-view.component';
import { DocumentsFolderRoutingModule } from './documents-folder.routing.module';
import { DocumentsFolderGuard } from './shared/documents-folder.guard';
import { DocumentsFolderService } from './shared/documents-folder.service';

@NgModule({
  declarations: [
    DocumentsFolderListComponent,
    DocumentsFolderNewComponent,
    DocumentsFolderEditComponent,
    DocumentsFolderViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DocumentsFolderRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DocumentsFolderService,
    DocumentsFolderGuard
  ],
  entryComponents: [
    DocumentsFolderNewComponent,
    DocumentsFolderEditComponent,
    DocumentsFolderViewComponent
  ]
})

export class DocumentsFolderModule {
}
