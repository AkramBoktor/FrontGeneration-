import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CashFormAllowanceListComponent } from './cash-form-allowance-list/cash-form-allowance-list.component';
import { CashFormAllowanceEditComponent } from './cash-form-allowance-edit/cash-form-allowance-edit.component';
import { CashFormAllowanceNewComponent } from './cash-form-allowance-new/cash-form-allowance-new.component';
import { CashFormAllowanceViewComponent } from './cash-form-allowance-view/cash-form-allowance-view.component';
import { CashFormAllowanceRoutingModule } from './cash-form-allowance.routing.module';
import { CashFormAllowanceService } from './shared/cash-form-allowance.service';
import { CashFormAllowanceGuard } from './shared/cash-form-allowance.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CashFormAllowanceListComponent,
    CashFormAllowanceNewComponent,
    CashFormAllowanceEditComponent,
    CashFormAllowanceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CashFormAllowanceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CashFormAllowanceService,
    CashFormAllowanceGuard
  ],
  entryComponents: [
    CashFormAllowanceNewComponent,
    CashFormAllowanceEditComponent,
    CashFormAllowanceViewComponent
  ]
})

export class CashFormAllowanceModule {
}
