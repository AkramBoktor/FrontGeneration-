import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { IncentiveBonusEditComponent } from './incentive-bonus-edit/incentive-bonus-edit.component';
import { IncentiveBonusListComponent } from './incentive-bonus-list/incentive-bonus-list.component';
import { IncentiveBonusNewComponent } from './incentive-bonus-new/incentive-bonus-new.component';
import { IncentiveBonusViewComponent } from './incentive-bonus-view/incentive-bonus-view.component';
import { IncentiveBonusRoutingModule } from './incentive-bonus.routing.module';
import { IncentiveBonusGuard } from './shared/incentive-bonus.guard';
import { IncentiveBonusService } from './shared/incentive-bonus.service';

@NgModule({
  declarations: [
    IncentiveBonusListComponent,
    IncentiveBonusNewComponent,
    IncentiveBonusEditComponent,
    IncentiveBonusViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    IncentiveBonusRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    IncentiveBonusService,
    IncentiveBonusGuard
  ],
  entryComponents: [
    IncentiveBonusNewComponent,
    IncentiveBonusEditComponent,
    IncentiveBonusViewComponent
  ]
})

export class IncentiveBonusModule {
}
