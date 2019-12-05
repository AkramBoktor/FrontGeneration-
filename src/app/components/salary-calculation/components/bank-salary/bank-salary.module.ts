import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BankSalaryListComponent } from './bank-salary-list/bank-salary-list.component';
import { BankSalaryEditComponent } from './bank-salary-edit/bank-salary-edit.component';
import { BankSalaryNewComponent } from './bank-salary-new/bank-salary-new.component';
import { BankSalaryViewComponent } from './bank-salary-view/bank-salary-view.component';
import { BankSalaryRoutingModule } from './bank-salary.routing.module';
import { BankSalaryService } from './shared/bank-salary.service';
import { BankSalaryGuard } from './shared/bank-salary.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BankSalaryListComponent,
    BankSalaryNewComponent,
    BankSalaryEditComponent,
    BankSalaryViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BankSalaryRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BankSalaryService,
    BankSalaryGuard
  ],
  entryComponents: [
    BankSalaryNewComponent,
    BankSalaryEditComponent,
    BankSalaryViewComponent
  ]
})

export class BankSalaryModule {
}
