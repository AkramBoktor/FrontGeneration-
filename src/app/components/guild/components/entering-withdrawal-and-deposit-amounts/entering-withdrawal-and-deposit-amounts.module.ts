import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EnteringWithdrawalAndDepositAmountsListComponent } from './entering-withdrawal-and-deposit-amounts-list/entering-withdrawal-and-deposit-amounts-list.component';
import { EnteringWithdrawalAndDepositAmountsEditComponent } from './entering-withdrawal-and-deposit-amounts-edit/entering-withdrawal-and-deposit-amounts-edit.component';
import { EnteringWithdrawalAndDepositAmountsNewComponent } from './entering-withdrawal-and-deposit-amounts-new/entering-withdrawal-and-deposit-amounts-new.component';
import { EnteringWithdrawalAndDepositAmountsViewComponent } from './entering-withdrawal-and-deposit-amounts-view/entering-withdrawal-and-deposit-amounts-view.component';
import { EnteringWithdrawalAndDepositAmountsRoutingModule } from './entering-withdrawal-and-deposit-amounts.routing.module';
import { EnteringWithdrawalAndDepositAmountsService } from './shared/entering-withdrawal-and-deposit-amounts.service';
import { EnteringWithdrawalAndDepositAmountsGuard } from './shared/entering-withdrawal-and-deposit-amounts.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EnteringWithdrawalAndDepositAmountsListComponent,
    EnteringWithdrawalAndDepositAmountsNewComponent,
    EnteringWithdrawalAndDepositAmountsEditComponent,
    EnteringWithdrawalAndDepositAmountsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EnteringWithdrawalAndDepositAmountsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EnteringWithdrawalAndDepositAmountsService,
    EnteringWithdrawalAndDepositAmountsGuard
  ],
  entryComponents: [
    EnteringWithdrawalAndDepositAmountsNewComponent,
    EnteringWithdrawalAndDepositAmountsEditComponent,
    EnteringWithdrawalAndDepositAmountsViewComponent
  ]
})

export class EnteringWithdrawalAndDepositAmountsModule {
}
