import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { StatementOfEmployeePerformanceDuringACertainPeriodListComponent } from './statement-of-employee-performance-during-a-certain-period-list/statement-of-employee-performance-during-a-certain-period-list.component';
import { StatementOfEmployeePerformanceDuringACertainPeriodEditComponent } from './statement-of-employee-performance-during-a-certain-period-edit/statement-of-employee-performance-during-a-certain-period-edit.component';
import { StatementOfEmployeePerformanceDuringACertainPeriodNewComponent } from './statement-of-employee-performance-during-a-certain-period-new/statement-of-employee-performance-during-a-certain-period-new.component';
import { StatementOfEmployeePerformanceDuringACertainPeriodViewComponent } from './statement-of-employee-performance-during-a-certain-period-view/statement-of-employee-performance-during-a-certain-period-view.component';
import { StatementOfEmployeePerformanceDuringACertainPeriodRoutingModule } from './statement-of-employee-performance-during-a-certain-period.routing.module';
import { StatementOfEmployeePerformanceDuringACertainPeriodService } from './shared/statement-of-employee-performance-during-a-certain-period.service';
import { StatementOfEmployeePerformanceDuringACertainPeriodGuard } from './shared/statement-of-employee-performance-during-a-certain-period.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    StatementOfEmployeePerformanceDuringACertainPeriodListComponent,
    StatementOfEmployeePerformanceDuringACertainPeriodNewComponent,
    StatementOfEmployeePerformanceDuringACertainPeriodEditComponent,
    StatementOfEmployeePerformanceDuringACertainPeriodViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    StatementOfEmployeePerformanceDuringACertainPeriodRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    StatementOfEmployeePerformanceDuringACertainPeriodService,
    StatementOfEmployeePerformanceDuringACertainPeriodGuard
  ],
  entryComponents: [
    StatementOfEmployeePerformanceDuringACertainPeriodNewComponent,
    StatementOfEmployeePerformanceDuringACertainPeriodEditComponent,
    StatementOfEmployeePerformanceDuringACertainPeriodViewComponent
  ]
})

export class StatementOfEmployeePerformanceDuringACertainPeriodModule {
}
