import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBListComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-b-list/deduction-of-an-amount-to-an-employee-of-the-fund-b-list.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBEditComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-b-edit/deduction-of-an-amount-to-an-employee-of-the-fund-b-edit.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBNewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-b-new/deduction-of-an-amount-to-an-employee-of-the-fund-b-new.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBViewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-b-view/deduction-of-an-amount-to-an-employee-of-the-fund-b-view.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBRoutingModule } from './deduction-of-an-amount-to-an-employee-of-the-fund-b.routing.module';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBService } from './shared/deduction-of-an-amount-to-an-employee-of-the-fund-b.service';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBGuard } from './shared/deduction-of-an-amount-to-an-employee-of-the-fund-b.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DeductionOfAnAmountToAnEmployeeOfTheFundBListComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundBNewComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundBEditComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundBViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DeductionOfAnAmountToAnEmployeeOfTheFundBRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DeductionOfAnAmountToAnEmployeeOfTheFundBService,
    DeductionOfAnAmountToAnEmployeeOfTheFundBGuard
  ],
  entryComponents: [
    DeductionOfAnAmountToAnEmployeeOfTheFundBNewComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundBEditComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundBViewComponent
  ]
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundBModule {
}
