import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGListComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-g-list/deduction-of-an-amount-to-an-employee-of-the-fund-g-list.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGEditComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-g-edit/deduction-of-an-amount-to-an-employee-of-the-fund-g-edit.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGNewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-g-new/deduction-of-an-amount-to-an-employee-of-the-fund-g-new.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGViewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-g-view/deduction-of-an-amount-to-an-employee-of-the-fund-g-view.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGRoutingModule } from './deduction-of-an-amount-to-an-employee-of-the-fund-g.routing.module';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGService } from './shared/deduction-of-an-amount-to-an-employee-of-the-fund-g.service';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGGuard } from './shared/deduction-of-an-amount-to-an-employee-of-the-fund-g.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DeductionOfAnAmountToAnEmployeeOfTheFundGListComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundGNewComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundGEditComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundGViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DeductionOfAnAmountToAnEmployeeOfTheFundGRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DeductionOfAnAmountToAnEmployeeOfTheFundGService,
    DeductionOfAnAmountToAnEmployeeOfTheFundGGuard
  ],
  entryComponents: [
    DeductionOfAnAmountToAnEmployeeOfTheFundGNewComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundGEditComponent,
    DeductionOfAnAmountToAnEmployeeOfTheFundGViewComponent
  ]
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundGModule {
}
