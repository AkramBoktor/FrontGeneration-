import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscriptionValueByAgeGListComponent } from './subscription-value-by-age-g-list/subscription-value-by-age-g-list.component';
import { SubscriptionValueByAgeGEditComponent } from './subscription-value-by-age-g-edit/subscription-value-by-age-g-edit.component';
import { SubscriptionValueByAgeGNewComponent } from './subscription-value-by-age-g-new/subscription-value-by-age-g-new.component';
import { SubscriptionValueByAgeGViewComponent } from './subscription-value-by-age-g-view/subscription-value-by-age-g-view.component';
import { SubscriptionValueByAgeGRoutingModule } from './subscription-value-by-age-g.routing.module';
import { SubscriptionValueByAgeGService } from './shared/subscription-value-by-age-g.service';
import { SubscriptionValueByAgeGGuard } from './shared/subscription-value-by-age-g.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscriptionValueByAgeGListComponent,
    SubscriptionValueByAgeGNewComponent,
    SubscriptionValueByAgeGEditComponent,
    SubscriptionValueByAgeGViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscriptionValueByAgeGRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscriptionValueByAgeGService,
    SubscriptionValueByAgeGGuard
  ],
  entryComponents: [
    SubscriptionValueByAgeGNewComponent,
    SubscriptionValueByAgeGEditComponent,
    SubscriptionValueByAgeGViewComponent
  ]
})

export class SubscriptionValueByAgeGModule {
}
