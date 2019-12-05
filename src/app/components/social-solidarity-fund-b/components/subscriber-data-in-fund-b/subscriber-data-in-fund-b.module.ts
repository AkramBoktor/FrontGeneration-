import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscriberDataInFundBListComponent } from './subscriber-data-in-fund-b-list/subscriber-data-in-fund-b-list.component';
import { SubscriberDataInFundBEditComponent } from './subscriber-data-in-fund-b-edit/subscriber-data-in-fund-b-edit.component';
import { SubscriberDataInFundBNewComponent } from './subscriber-data-in-fund-b-new/subscriber-data-in-fund-b-new.component';
import { SubscriberDataInFundBViewComponent } from './subscriber-data-in-fund-b-view/subscriber-data-in-fund-b-view.component';
import { SubscriberDataInFundBRoutingModule } from './subscriber-data-in-fund-b.routing.module';
import { SubscriberDataInFundBService } from './shared/subscriber-data-in-fund-b.service';
import { SubscriberDataInFundBGuard } from './shared/subscriber-data-in-fund-b.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscriberDataInFundBListComponent,
    SubscriberDataInFundBNewComponent,
    SubscriberDataInFundBEditComponent,
    SubscriberDataInFundBViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscriberDataInFundBRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscriberDataInFundBService,
    SubscriberDataInFundBGuard
  ],
  entryComponents: [
    SubscriberDataInFundBNewComponent,
    SubscriberDataInFundBEditComponent,
    SubscriberDataInFundBViewComponent
  ]
})

export class SubscriberDataInFundBModule {
}
