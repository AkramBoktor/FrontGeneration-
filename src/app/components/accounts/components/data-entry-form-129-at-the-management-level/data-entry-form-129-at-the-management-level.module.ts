import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataEntryForm129AtTheManagementLevelListComponent } from './data-entry-form-129-at-the-management-level-list/data-entry-form-129-at-the-management-level-list.component';
import { DataEntryForm129AtTheManagementLevelEditComponent } from './data-entry-form-129-at-the-management-level-edit/data-entry-form-129-at-the-management-level-edit.component';
import { DataEntryForm129AtTheManagementLevelNewComponent } from './data-entry-form-129-at-the-management-level-new/data-entry-form-129-at-the-management-level-new.component';
import { DataEntryForm129AtTheManagementLevelViewComponent } from './data-entry-form-129-at-the-management-level-view/data-entry-form-129-at-the-management-level-view.component';
import { DataEntryForm129AtTheManagementLevelRoutingModule } from './data-entry-form-129-at-the-management-level.routing.module';
import { DataEntryForm129AtTheManagementLevelService } from './shared/data-entry-form-129-at-the-management-level.service';
import { DataEntryForm129AtTheManagementLevelGuard } from './shared/data-entry-form-129-at-the-management-level.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataEntryForm129AtTheManagementLevelListComponent,
    DataEntryForm129AtTheManagementLevelNewComponent,
    DataEntryForm129AtTheManagementLevelEditComponent,
    DataEntryForm129AtTheManagementLevelViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataEntryForm129AtTheManagementLevelRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataEntryForm129AtTheManagementLevelService,
    DataEntryForm129AtTheManagementLevelGuard
  ],
  entryComponents: [
    DataEntryForm129AtTheManagementLevelNewComponent,
    DataEntryForm129AtTheManagementLevelEditComponent,
    DataEntryForm129AtTheManagementLevelViewComponent
  ]
})

export class DataEntryForm129AtTheManagementLevelModule {
}
