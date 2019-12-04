import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscriptionAmountUnderChecksAListComponent } from './subscription-amount-under-checks-a-list/subscription-amount-under-checks-a-list.component';
import { SubscriptionAmountUnderChecksAEditComponent } from './subscription-amount-under-checks-a-edit/subscription-amount-under-checks-a-edit.component';
import { SubscriptionAmountUnderChecksANewComponent } from './subscription-amount-under-checks-a-new/subscription-amount-under-checks-a-new.component';
import { SubscriptionAmountUnderChecksAViewComponent } from './subscription-amount-under-checks-a-view/subscription-amount-under-checks-a-view.component';
import { SubscriptionAmountUnderChecksARoutingModule } from './subscription-amount-under-checks-a.routing.module';
import { SubscriptionAmountUnderChecksAService } from './shared/subscription-amount-under-checks-a.service';
import { SubscriptionAmountUnderChecksAGuard } from './shared/subscription-amount-under-checks-a.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscriptionAmountUnderChecksAListComponent,
    SubscriptionAmountUnderChecksANewComponent,
    SubscriptionAmountUnderChecksAEditComponent,
    SubscriptionAmountUnderChecksAViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscriptionAmountUnderChecksARoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscriptionAmountUnderChecksAService,
    SubscriptionAmountUnderChecksAGuard
  ],
  entryComponents: [
    SubscriptionAmountUnderChecksANewComponent,
    SubscriptionAmountUnderChecksAEditComponent,
    SubscriptionAmountUnderChecksAViewComponent
  ]
})

export class SubscriptionAmountUnderChecksAModule {
}
