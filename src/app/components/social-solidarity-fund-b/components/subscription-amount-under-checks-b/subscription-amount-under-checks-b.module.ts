import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscriptionAmountUnderChecksBListComponent } from './subscription-amount-under-checks-b-list/subscription-amount-under-checks-b-list.component';
import { SubscriptionAmountUnderChecksBEditComponent } from './subscription-amount-under-checks-b-edit/subscription-amount-under-checks-b-edit.component';
import { SubscriptionAmountUnderChecksBNewComponent } from './subscription-amount-under-checks-b-new/subscription-amount-under-checks-b-new.component';
import { SubscriptionAmountUnderChecksBViewComponent } from './subscription-amount-under-checks-b-view/subscription-amount-under-checks-b-view.component';
import { SubscriptionAmountUnderChecksBRoutingModule } from './subscription-amount-under-checks-b.routing.module';
import { SubscriptionAmountUnderChecksBService } from './shared/subscription-amount-under-checks-b.service';
import { SubscriptionAmountUnderChecksBGuard } from './shared/subscription-amount-under-checks-b.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscriptionAmountUnderChecksBListComponent,
    SubscriptionAmountUnderChecksBNewComponent,
    SubscriptionAmountUnderChecksBEditComponent,
    SubscriptionAmountUnderChecksBViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscriptionAmountUnderChecksBRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscriptionAmountUnderChecksBService,
    SubscriptionAmountUnderChecksBGuard
  ],
  entryComponents: [
    SubscriptionAmountUnderChecksBNewComponent,
    SubscriptionAmountUnderChecksBEditComponent,
    SubscriptionAmountUnderChecksBViewComponent
  ]
})

export class SubscriptionAmountUnderChecksBModule {
}
