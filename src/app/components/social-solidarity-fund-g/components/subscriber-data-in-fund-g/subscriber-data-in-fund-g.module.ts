import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscriberDataInFundGListComponent } from './subscriber-data-in-fund-g-list/subscriber-data-in-fund-g-list.component';
import { SubscriberDataInFundGEditComponent } from './subscriber-data-in-fund-g-edit/subscriber-data-in-fund-g-edit.component';
import { SubscriberDataInFundGNewComponent } from './subscriber-data-in-fund-g-new/subscriber-data-in-fund-g-new.component';
import { SubscriberDataInFundGViewComponent } from './subscriber-data-in-fund-g-view/subscriber-data-in-fund-g-view.component';
import { SubscriberDataInFundGRoutingModule } from './subscriber-data-in-fund-g.routing.module';
import { SubscriberDataInFundGService } from './shared/subscriber-data-in-fund-g.service';
import { SubscriberDataInFundGGuard } from './shared/subscriber-data-in-fund-g.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscriberDataInFundGListComponent,
    SubscriberDataInFundGNewComponent,
    SubscriberDataInFundGEditComponent,
    SubscriberDataInFundGViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscriberDataInFundGRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscriberDataInFundGService,
    SubscriberDataInFundGGuard
  ],
  entryComponents: [
    SubscriberDataInFundGNewComponent,
    SubscriberDataInFundGEditComponent,
    SubscriberDataInFundGViewComponent
  ]
})

export class SubscriberDataInFundGModule {
}
