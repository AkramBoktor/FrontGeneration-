import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { VacationsBalanceListComponent } from './vacations-balance-list/vacations-balance-list.component';
import { VacationsBalanceEditComponent } from './vacations-balance-edit/vacations-balance-edit.component';
import { VacationsBalanceNewComponent } from './vacations-balance-new/vacations-balance-new.component';
import { VacationsBalanceViewComponent } from './vacations-balance-view/vacations-balance-view.component';
import { VacationsBalanceRoutingModule } from './vacations-balance.routing.module';
import { VacationsBalanceService } from './shared/vacations-balance.service';
import { VacationsBalanceGuard } from './shared/vacations-balance.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    VacationsBalanceListComponent,
    VacationsBalanceNewComponent,
    VacationsBalanceEditComponent,
    VacationsBalanceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    VacationsBalanceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    VacationsBalanceService,
    VacationsBalanceGuard
  ],
  entryComponents: [
    VacationsBalanceNewComponent,
    VacationsBalanceEditComponent,
    VacationsBalanceViewComponent
  ]
})

export class VacationsBalanceModule {
}
