import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { InstallationRecordListComponent } from './installation-record-list/installation-record-list.component';
import { InstallationRecordEditComponent } from './installation-record-edit/installation-record-edit.component';
import { InstallationRecordNewComponent } from './installation-record-new/installation-record-new.component';
import { InstallationRecordViewComponent } from './installation-record-view/installation-record-view.component';
import { InstallationRecordRoutingModule } from './installation-record.routing.module';
import { InstallationRecordService } from './shared/installation-record.service';
import { InstallationRecordGuard } from './shared/installation-record.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    InstallationRecordListComponent,
    InstallationRecordNewComponent,
    InstallationRecordEditComponent,
    InstallationRecordViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    InstallationRecordRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    InstallationRecordService,
    InstallationRecordGuard
  ],
  entryComponents: [
    InstallationRecordNewComponent,
    InstallationRecordEditComponent,
    InstallationRecordViewComponent
  ]
})

export class InstallationRecordModule {
}
