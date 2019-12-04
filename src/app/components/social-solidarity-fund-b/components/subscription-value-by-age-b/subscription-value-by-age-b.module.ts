import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscriptionValueByAgeBListComponent } from './subscription-value-by-age-b-list/subscription-value-by-age-b-list.component';
import { SubscriptionValueByAgeBEditComponent } from './subscription-value-by-age-b-edit/subscription-value-by-age-b-edit.component';
import { SubscriptionValueByAgeBNewComponent } from './subscription-value-by-age-b-new/subscription-value-by-age-b-new.component';
import { SubscriptionValueByAgeBViewComponent } from './subscription-value-by-age-b-view/subscription-value-by-age-b-view.component';
import { SubscriptionValueByAgeBRoutingModule } from './subscription-value-by-age-b.routing.module';
import { SubscriptionValueByAgeBService } from './shared/subscription-value-by-age-b.service';
import { SubscriptionValueByAgeBGuard } from './shared/subscription-value-by-age-b.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscriptionValueByAgeBListComponent,
    SubscriptionValueByAgeBNewComponent,
    SubscriptionValueByAgeBEditComponent,
    SubscriptionValueByAgeBViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscriptionValueByAgeBRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscriptionValueByAgeBService,
    SubscriptionValueByAgeBGuard
  ],
  entryComponents: [
    SubscriptionValueByAgeBNewComponent,
    SubscriptionValueByAgeBEditComponent,
    SubscriptionValueByAgeBViewComponent
  ]
})

export class SubscriptionValueByAgeBModule {
}
