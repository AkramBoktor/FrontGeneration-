import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscriberDataInFundAListComponent } from './subscriber-data-in-fund-a-list/subscriber-data-in-fund-a-list.component';
import { SubscriberDataInFundAEditComponent } from './subscriber-data-in-fund-a-edit/subscriber-data-in-fund-a-edit.component';
import { SubscriberDataInFundANewComponent } from './subscriber-data-in-fund-a-new/subscriber-data-in-fund-a-new.component';
import { SubscriberDataInFundAViewComponent } from './subscriber-data-in-fund-a-view/subscriber-data-in-fund-a-view.component';
import { SubscriberDataInFundARoutingModule } from './subscriber-data-in-fund-a.routing.module';
import { SubscriberDataInFundAService } from './shared/subscriber-data-in-fund-a.service';
import { SubscriberDataInFundAGuard } from './shared/subscriber-data-in-fund-a.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscriberDataInFundAListComponent,
    SubscriberDataInFundANewComponent,
    SubscriberDataInFundAEditComponent,
    SubscriberDataInFundAViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscriberDataInFundARoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscriberDataInFundAService,
    SubscriberDataInFundAGuard
  ],
  entryComponents: [
    SubscriberDataInFundANewComponent,
    SubscriberDataInFundAEditComponent,
    SubscriberDataInFundAViewComponent
  ]
})

export class SubscriberDataInFundAModule {
}
