import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DailyPrintErrorDataListComponent } from './daily-print-error-data-list/daily-print-error-data-list.component';
import { DailyPrintErrorDataEditComponent } from './daily-print-error-data-edit/daily-print-error-data-edit.component';
import { DailyPrintErrorDataNewComponent } from './daily-print-error-data-new/daily-print-error-data-new.component';
import { DailyPrintErrorDataViewComponent } from './daily-print-error-data-view/daily-print-error-data-view.component';
import { DailyPrintErrorDataRoutingModule } from './daily-print-error-data.routing.module';
import { DailyPrintErrorDataService } from './shared/daily-print-error-data.service';
import { DailyPrintErrorDataGuard } from './shared/daily-print-error-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DailyPrintErrorDataListComponent,
    DailyPrintErrorDataNewComponent,
    DailyPrintErrorDataEditComponent,
    DailyPrintErrorDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DailyPrintErrorDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DailyPrintErrorDataService,
    DailyPrintErrorDataGuard
  ],
  entryComponents: [
    DailyPrintErrorDataNewComponent,
    DailyPrintErrorDataEditComponent,
    DailyPrintErrorDataViewComponent
  ]
})

export class DailyPrintErrorDataModule {
}
