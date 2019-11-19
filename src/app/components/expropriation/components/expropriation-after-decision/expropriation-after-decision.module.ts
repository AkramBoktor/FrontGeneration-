import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExpropriationAfterDecisionListComponent } from './expropriation-after-decision-list/expropriation-after-decision-list.component';
import { ExpropriationAfterDecisionEditComponent } from './expropriation-after-decision-edit/expropriation-after-decision-edit.component';
import { ExpropriationAfterDecisionNewComponent } from './expropriation-after-decision-new/expropriation-after-decision-new.component';
import { ExpropriationAfterDecisionViewComponent } from './expropriation-after-decision-view/expropriation-after-decision-view.component';
import { ExpropriationAfterDecisionRoutingModule } from './expropriation-after-decision.routing.module';
import { ExpropriationAfterDecisionService } from './shared/expropriation-after-decision.service';
import { ExpropriationAfterDecisionGuard } from './shared/expropriation-after-decision.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExpropriationAfterDecisionListComponent,
    ExpropriationAfterDecisionNewComponent,
    ExpropriationAfterDecisionEditComponent,
    ExpropriationAfterDecisionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExpropriationAfterDecisionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExpropriationAfterDecisionService,
    ExpropriationAfterDecisionGuard
  ],
  entryComponents: [
    ExpropriationAfterDecisionNewComponent,
    ExpropriationAfterDecisionEditComponent,
    ExpropriationAfterDecisionViewComponent
  ]
})

export class ExpropriationAfterDecisionModule {
}
