import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExpropriationDataBeforeThePrimeMinisterDecisionListComponent } from './expropriation-data-before-the-prime-minister-decision-list/expropriation-data-before-the-prime-minister-decision-list.component';
import { ExpropriationDataBeforeThePrimeMinisterDecisionEditComponent } from './expropriation-data-before-the-prime-minister-decision-edit/expropriation-data-before-the-prime-minister-decision-edit.component';
import { ExpropriationDataBeforeThePrimeMinisterDecisionNewComponent } from './expropriation-data-before-the-prime-minister-decision-new/expropriation-data-before-the-prime-minister-decision-new.component';
import { ExpropriationDataBeforeThePrimeMinisterDecisionViewComponent } from './expropriation-data-before-the-prime-minister-decision-view/expropriation-data-before-the-prime-minister-decision-view.component';
import { ExpropriationDataBeforeThePrimeMinisterDecisionRoutingModule } from './expropriation-data-before-the-prime-minister-decision.routing.module';
import { ExpropriationDataBeforeThePrimeMinisterDecisionService } from './shared/expropriation-data-before-the-prime-minister-decision.service';
import { ExpropriationDataBeforeThePrimeMinisterDecisionGuard } from './shared/expropriation-data-before-the-prime-minister-decision.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExpropriationDataBeforeThePrimeMinisterDecisionListComponent,
    ExpropriationDataBeforeThePrimeMinisterDecisionNewComponent,
    ExpropriationDataBeforeThePrimeMinisterDecisionEditComponent,
    ExpropriationDataBeforeThePrimeMinisterDecisionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExpropriationDataBeforeThePrimeMinisterDecisionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExpropriationDataBeforeThePrimeMinisterDecisionService,
    ExpropriationDataBeforeThePrimeMinisterDecisionGuard
  ],
  entryComponents: [
    ExpropriationDataBeforeThePrimeMinisterDecisionNewComponent,
    ExpropriationDataBeforeThePrimeMinisterDecisionEditComponent,
    ExpropriationDataBeforeThePrimeMinisterDecisionViewComponent
  ]
})

export class ExpropriationDataBeforeThePrimeMinisterDecisionModule {
}
