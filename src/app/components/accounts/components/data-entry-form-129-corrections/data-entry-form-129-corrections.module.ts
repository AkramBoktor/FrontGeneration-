import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataEntryForm129CorrectionsListComponent } from './data-entry-form-129-corrections-list/data-entry-form-129-corrections-list.component';
import { DataEntryForm129CorrectionsEditComponent } from './data-entry-form-129-corrections-edit/data-entry-form-129-corrections-edit.component';
import { DataEntryForm129CorrectionsNewComponent } from './data-entry-form-129-corrections-new/data-entry-form-129-corrections-new.component';
import { DataEntryForm129CorrectionsViewComponent } from './data-entry-form-129-corrections-view/data-entry-form-129-corrections-view.component';
import { DataEntryForm129CorrectionsRoutingModule } from './data-entry-form-129-corrections.routing.module';
import { DataEntryForm129CorrectionsService } from './shared/data-entry-form-129-corrections.service';
import { DataEntryForm129CorrectionsGuard } from './shared/data-entry-form-129-corrections.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataEntryForm129CorrectionsListComponent,
    DataEntryForm129CorrectionsNewComponent,
    DataEntryForm129CorrectionsEditComponent,
    DataEntryForm129CorrectionsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataEntryForm129CorrectionsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataEntryForm129CorrectionsService,
    DataEntryForm129CorrectionsGuard
  ],
  entryComponents: [
    DataEntryForm129CorrectionsNewComponent,
    DataEntryForm129CorrectionsEditComponent,
    DataEntryForm129CorrectionsViewComponent
  ]
})

export class DataEntryForm129CorrectionsModule {
}
