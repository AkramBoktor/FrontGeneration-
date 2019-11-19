import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BidPartsDataListComponent } from './bid-parts-data-list/bid-parts-data-list.component';
import { BidPartsDataEditComponent } from './bid-parts-data-edit/bid-parts-data-edit.component';
import { BidPartsDataNewComponent } from './bid-parts-data-new/bid-parts-data-new.component';
import { BidPartsDataViewComponent } from './bid-parts-data-view/bid-parts-data-view.component';
import { BidPartsDataRoutingModule } from './bid-parts-data.routing.module';
import { BidPartsDataService } from './shared/bid-parts-data.service';
import { BidPartsDataGuard } from './shared/bid-parts-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BidPartsDataListComponent,
    BidPartsDataNewComponent,
    BidPartsDataEditComponent,
    BidPartsDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BidPartsDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BidPartsDataService,
    BidPartsDataGuard
  ],
  entryComponents: [
    BidPartsDataNewComponent,
    BidPartsDataEditComponent,
    BidPartsDataViewComponent
  ]
})

export class BidPartsDataModule {
}
