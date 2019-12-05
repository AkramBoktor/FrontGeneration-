import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MasterFileListComponent } from './master-file-list/master-file-list.component';
import { MasterFileEditComponent } from './master-file-edit/master-file-edit.component';
import { MasterFileNewComponent } from './master-file-new/master-file-new.component';
import { MasterFileViewComponent } from './master-file-view/master-file-view.component';
import { MasterFileRoutingModule } from './master-file.routing.module';
import { MasterFileService } from './shared/master-file.service';
import { MasterFileGuard } from './shared/master-file.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MasterFileListComponent,
    MasterFileNewComponent,
    MasterFileEditComponent,
    MasterFileViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MasterFileRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MasterFileService,
    MasterFileGuard
  ],
  entryComponents: [
    MasterFileNewComponent,
    MasterFileEditComponent,
    MasterFileViewComponent
  ]
})

export class MasterFileModule {
}
