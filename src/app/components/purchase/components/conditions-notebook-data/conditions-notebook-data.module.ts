import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ConditionsNotebookDataListComponent } from './conditions-notebook-data-list/conditions-notebook-data-list.component';
import { ConditionsNotebookDataEditComponent } from './conditions-notebook-data-edit/conditions-notebook-data-edit.component';
import { ConditionsNotebookDataNewComponent } from './conditions-notebook-data-new/conditions-notebook-data-new.component';
import { ConditionsNotebookDataViewComponent } from './conditions-notebook-data-view/conditions-notebook-data-view.component';
import { ConditionsNotebookDataRoutingModule } from './conditions-notebook-data.routing.module';
import { ConditionsNotebookDataService } from './shared/conditions-notebook-data.service';
import { ConditionsNotebookDataGuard } from './shared/conditions-notebook-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ConditionsNotebookDataListComponent,
    ConditionsNotebookDataNewComponent,
    ConditionsNotebookDataEditComponent,
    ConditionsNotebookDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ConditionsNotebookDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ConditionsNotebookDataService,
    ConditionsNotebookDataGuard
  ],
  entryComponents: [
    ConditionsNotebookDataNewComponent,
    ConditionsNotebookDataEditComponent,
    ConditionsNotebookDataViewComponent
  ]
})

export class ConditionsNotebookDataModule {
}
