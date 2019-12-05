import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscriptionAmountUnderChecksGListComponent } from './subscription-amount-under-checks-g-list/subscription-amount-under-checks-g-list.component';
import { SubscriptionAmountUnderChecksGEditComponent } from './subscription-amount-under-checks-g-edit/subscription-amount-under-checks-g-edit.component';
import { SubscriptionAmountUnderChecksGNewComponent } from './subscription-amount-under-checks-g-new/subscription-amount-under-checks-g-new.component';
import { SubscriptionAmountUnderChecksGViewComponent } from './subscription-amount-under-checks-g-view/subscription-amount-under-checks-g-view.component';
import { SubscriptionAmountUnderChecksGRoutingModule } from './subscription-amount-under-checks-g.routing.module';
import { SubscriptionAmountUnderChecksGService } from './shared/subscription-amount-under-checks-g.service';
import { SubscriptionAmountUnderChecksGGuard } from './shared/subscription-amount-under-checks-g.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscriptionAmountUnderChecksGListComponent,
    SubscriptionAmountUnderChecksGNewComponent,
    SubscriptionAmountUnderChecksGEditComponent,
    SubscriptionAmountUnderChecksGViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscriptionAmountUnderChecksGRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscriptionAmountUnderChecksGService,
    SubscriptionAmountUnderChecksGGuard
  ],
  entryComponents: [
    SubscriptionAmountUnderChecksGNewComponent,
    SubscriptionAmountUnderChecksGEditComponent,
    SubscriptionAmountUnderChecksGViewComponent
  ]
})

export class SubscriptionAmountUnderChecksGModule {
}
