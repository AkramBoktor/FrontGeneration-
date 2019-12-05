import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscriptionValueByAgeAListComponent } from './subscription-value-by-age-a-list/subscription-value-by-age-a-list.component';
import { SubscriptionValueByAgeAEditComponent } from './subscription-value-by-age-a-edit/subscription-value-by-age-a-edit.component';
import { SubscriptionValueByAgeANewComponent } from './subscription-value-by-age-a-new/subscription-value-by-age-a-new.component';
import { SubscriptionValueByAgeAViewComponent } from './subscription-value-by-age-a-view/subscription-value-by-age-a-view.component';
import { SubscriptionValueByAgeARoutingModule } from './subscription-value-by-age-a.routing.module';
import { SubscriptionValueByAgeAService } from './shared/subscription-value-by-age-a.service';
import { SubscriptionValueByAgeAGuard } from './shared/subscription-value-by-age-a.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscriptionValueByAgeAListComponent,
    SubscriptionValueByAgeANewComponent,
    SubscriptionValueByAgeAEditComponent,
    SubscriptionValueByAgeAViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscriptionValueByAgeARoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscriptionValueByAgeAService,
    SubscriptionValueByAgeAGuard
  ],
  entryComponents: [
    SubscriptionValueByAgeANewComponent,
    SubscriptionValueByAgeAEditComponent,
    SubscriptionValueByAgeAViewComponent
  ]
})

export class SubscriptionValueByAgeAModule {
}
