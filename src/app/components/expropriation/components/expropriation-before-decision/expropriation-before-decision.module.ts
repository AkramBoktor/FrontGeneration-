import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExpropriationBeforeDecisionListComponent } from './expropriation-before-decision-list/expropriation-before-decision-list.component';
import { ExpropriationBeforeDecisionEditComponent } from './expropriation-before-decision-edit/expropriation-before-decision-edit.component';
import { ExpropriationBeforeDecisionNewComponent } from './expropriation-before-decision-new/expropriation-before-decision-new.component';
import { ExpropriationBeforeDecisionViewComponent } from './expropriation-before-decision-view/expropriation-before-decision-view.component';
import { ExpropriationBeforeDecisionRoutingModule } from './expropriation-before-decision.routing.module';
import { ExpropriationBeforeDecisionService } from './shared/expropriation-before-decision.service';
import { ExpropriationBeforeDecisionGuard } from './shared/expropriation-before-decision.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExpropriationBeforeDecisionListComponent,
    ExpropriationBeforeDecisionNewComponent,
    ExpropriationBeforeDecisionEditComponent,
    ExpropriationBeforeDecisionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExpropriationBeforeDecisionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExpropriationBeforeDecisionService,
    ExpropriationBeforeDecisionGuard
  ],
  entryComponents: [
    ExpropriationBeforeDecisionNewComponent,
    ExpropriationBeforeDecisionEditComponent,
    ExpropriationBeforeDecisionViewComponent
  ]
})

export class ExpropriationBeforeDecisionModule {
}
