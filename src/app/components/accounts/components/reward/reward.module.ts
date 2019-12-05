import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RewardListComponent } from './reward-list/reward-list.component';
import { RewardEditComponent } from './reward-edit/reward-edit.component';
import { RewardNewComponent } from './reward-new/reward-new.component';
import { RewardViewComponent } from './reward-view/reward-view.component';
import { RewardRoutingModule } from './reward.routing.module';
import { RewardService } from './shared/reward.service';
import { RewardGuard } from './shared/reward.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RewardListComponent,
    RewardNewComponent,
    RewardEditComponent,
    RewardViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RewardRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RewardService,
    RewardGuard
  ],
  entryComponents: [
    RewardNewComponent,
    RewardEditComponent,
    RewardViewComponent
  ]
})

export class RewardModule {
}
