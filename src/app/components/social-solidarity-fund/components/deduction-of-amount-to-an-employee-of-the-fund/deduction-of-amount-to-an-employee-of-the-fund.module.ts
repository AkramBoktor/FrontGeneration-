import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DeductionOfAmountToAnEmployeeOfTheFundListComponent } from './deduction-of-amount-to-an-employee-of-the-fund-list/deduction-of-amount-to-an-employee-of-the-fund-list.component';
import { DeductionOfAmountToAnEmployeeOfTheFundEditComponent } from './deduction-of-amount-to-an-employee-of-the-fund-edit/deduction-of-amount-to-an-employee-of-the-fund-edit.component';
import { DeductionOfAmountToAnEmployeeOfTheFundNewComponent } from './deduction-of-amount-to-an-employee-of-the-fund-new/deduction-of-amount-to-an-employee-of-the-fund-new.component';
import { DeductionOfAmountToAnEmployeeOfTheFundViewComponent } from './deduction-of-amount-to-an-employee-of-the-fund-view/deduction-of-amount-to-an-employee-of-the-fund-view.component';
import { DeductionOfAmountToAnEmployeeOfTheFundRoutingModule } from './deduction-of-amount-to-an-employee-of-the-fund.routing.module';
import { DeductionOfAmountToAnEmployeeOfTheFundService } from './shared/deduction-of-amount-to-an-employee-of-the-fund.service';
import { DeductionOfAmountToAnEmployeeOfTheFundGuard } from './shared/deduction-of-amount-to-an-employee-of-the-fund.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DeductionOfAmountToAnEmployeeOfTheFundListComponent,
    DeductionOfAmountToAnEmployeeOfTheFundNewComponent,
    DeductionOfAmountToAnEmployeeOfTheFundEditComponent,
    DeductionOfAmountToAnEmployeeOfTheFundViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DeductionOfAmountToAnEmployeeOfTheFundRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DeductionOfAmountToAnEmployeeOfTheFundService,
    DeductionOfAmountToAnEmployeeOfTheFundGuard
  ],
  entryComponents: [
    DeductionOfAmountToAnEmployeeOfTheFundNewComponent,
    DeductionOfAmountToAnEmployeeOfTheFundEditComponent,
    DeductionOfAmountToAnEmployeeOfTheFundViewComponent
  ]
})

export class DeductionOfAmountToAnEmployeeOfTheFundModule {
}
