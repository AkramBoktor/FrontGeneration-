import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FenceFileListComponent } from './fence-file-list/fence-file-list.component';
import { FenceFileEditComponent } from './fence-file-edit/fence-file-edit.component';
import { FenceFileNewComponent } from './fence-file-new/fence-file-new.component';
import { FenceFileViewComponent } from './fence-file-view/fence-file-view.component';
import { FenceFileRoutingModule } from './fence-file.routing.module';
import { FenceFileService } from './shared/fence-file.service';
import { FenceFileGuard } from './shared/fence-file.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FenceFileListComponent,
    FenceFileNewComponent,
    FenceFileEditComponent,
    FenceFileViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FenceFileRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FenceFileService,
    FenceFileGuard
  ],
  entryComponents: [
    FenceFileNewComponent,
    FenceFileEditComponent,
    FenceFileViewComponent
  ]
})

export class FenceFileModule {
}
