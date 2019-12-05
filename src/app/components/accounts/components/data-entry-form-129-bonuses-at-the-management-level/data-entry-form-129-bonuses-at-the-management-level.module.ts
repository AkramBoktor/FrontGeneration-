import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataEntryForm129BonusesAtTheManagementLevelListComponent } from './data-entry-form-129-bonuses-at-the-management-level-list/data-entry-form-129-bonuses-at-the-management-level-list.component';
import { DataEntryForm129BonusesAtTheManagementLevelEditComponent } from './data-entry-form-129-bonuses-at-the-management-level-edit/data-entry-form-129-bonuses-at-the-management-level-edit.component';
import { DataEntryForm129BonusesAtTheManagementLevelNewComponent } from './data-entry-form-129-bonuses-at-the-management-level-new/data-entry-form-129-bonuses-at-the-management-level-new.component';
import { DataEntryForm129BonusesAtTheManagementLevelViewComponent } from './data-entry-form-129-bonuses-at-the-management-level-view/data-entry-form-129-bonuses-at-the-management-level-view.component';
import { DataEntryForm129BonusesAtTheManagementLevelRoutingModule } from './data-entry-form-129-bonuses-at-the-management-level.routing.module';
import { DataEntryForm129BonusesAtTheManagementLevelService } from './shared/data-entry-form-129-bonuses-at-the-management-level.service';
import { DataEntryForm129BonusesAtTheManagementLevelGuard } from './shared/data-entry-form-129-bonuses-at-the-management-level.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataEntryForm129BonusesAtTheManagementLevelListComponent,
    DataEntryForm129BonusesAtTheManagementLevelNewComponent,
    DataEntryForm129BonusesAtTheManagementLevelEditComponent,
    DataEntryForm129BonusesAtTheManagementLevelViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataEntryForm129BonusesAtTheManagementLevelRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataEntryForm129BonusesAtTheManagementLevelService,
    DataEntryForm129BonusesAtTheManagementLevelGuard
  ],
  entryComponents: [
    DataEntryForm129BonusesAtTheManagementLevelNewComponent,
    DataEntryForm129BonusesAtTheManagementLevelEditComponent,
    DataEntryForm129BonusesAtTheManagementLevelViewComponent
  ]
})

export class DataEntryForm129BonusesAtTheManagementLevelModule {
}
