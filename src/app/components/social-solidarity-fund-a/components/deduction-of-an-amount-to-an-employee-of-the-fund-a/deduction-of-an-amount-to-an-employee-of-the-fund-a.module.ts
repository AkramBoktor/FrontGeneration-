import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAListComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-a-list/deduction-of-an-amount-to-an-employee-of-the-fund-a-list.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAEditComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-a-edit/deduction-of-an-amount-to-an-employee-of-the-fund-a-edit.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundANewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-a-new/deduction-of-an-amount-to-an-employee-of-the-fund-a-new.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAViewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-a-view/deduction-of-an-amount-to-an-employee-of-the-fund-a-view.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundARoutingModule } from './deduction-of-an-amount-to-an-employee-of-the-fund-a.routing.module';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAService } from './shared/deduction-of-an-amount-to-an-employee-of-the-fund-a.service';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAGuard } from './shared/deduction-of-an-amount-to-an-employee-of-the-fund-a.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DeductionOfAnAmountToAnEmployeeOfTheFundAListComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundANewComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundAEditComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundAViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DeductionOfAnAmountToAnEmployeeOfTheFundARoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DeductionOfAnAmountToAnEmployeeOfTheFundAService,
    DeductionOfAnAmountToAnEmployeeOfTheFundAGuard
  ],
  entryComponents: [
    DeductionOfAnAmountToAnEmployeeOfTheFundANewComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundAEditComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundAViewComponent
  ]
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundAModule {
}
