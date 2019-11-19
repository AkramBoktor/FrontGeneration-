import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MonthlyCompletionOfConsultantContractPeriodEditComponent } from './monthly-completion-of-consultant-contract-period-edit/monthly-completion-of-consultant-contract-period-edit.component';
import { MonthlyCompletionOfConsultantContractPeriodListComponent } from './monthly-completion-of-consultant-contract-period-list/monthly-completion-of-consultant-contract-period-list.component';
import { MonthlyCompletionOfConsultantContractPeriodNewComponent } from './monthly-completion-of-consultant-contract-period-new/monthly-completion-of-consultant-contract-period-new.component';
import { MonthlyCompletionOfConsultantContractPeriodViewComponent } from './monthly-completion-of-consultant-contract-period-view/monthly-completion-of-consultant-contract-period-view.component';
import { MonthlyCompletionOfConsultantContractPeriodRoutingModule } from './monthly-completion-of-consultant-contract-period.routing.module';
import { MonthlyCompletionOfConsultantContractPeriodGuard } from './shared/monthly-completion-of-consultant-contract-period.guard';
import { MonthlyCompletionOfConsultantContractPeriodService } from './shared/monthly-completion-of-consultant-contract-period.service';

@NgModule({
  declarations: [
    MonthlyCompletionOfConsultantContractPeriodListComponent,
    MonthlyCompletionOfConsultantContractPeriodNewComponent,
    MonthlyCompletionOfConsultantContractPeriodEditComponent,
    MonthlyCompletionOfConsultantContractPeriodViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MonthlyCompletionOfConsultantContractPeriodRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MonthlyCompletionOfConsultantContractPeriodService,
    MonthlyCompletionOfConsultantContractPeriodGuard
  ],
  entryComponents: [
    MonthlyCompletionOfConsultantContractPeriodNewComponent,
    MonthlyCompletionOfConsultantContractPeriodEditComponent,
    MonthlyCompletionOfConsultantContractPeriodViewComponent
  ]
})

export class MonthlyCompletionOfConsultantContractPeriodModule {
}
