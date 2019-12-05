import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SteelPriceCementOnThePriceListListComponent } from './steel-price-cement-on-the-price-list-list/steel-price-cement-on-the-price-list-list.component';
import { SteelPriceCementOnThePriceListEditComponent } from './steel-price-cement-on-the-price-list-edit/steel-price-cement-on-the-price-list-edit.component';
import { SteelPriceCementOnThePriceListNewComponent } from './steel-price-cement-on-the-price-list-new/steel-price-cement-on-the-price-list-new.component';
import { SteelPriceCementOnThePriceListViewComponent } from './steel-price-cement-on-the-price-list-view/steel-price-cement-on-the-price-list-view.component';
import { SteelPriceCementOnThePriceListRoutingModule } from './steel-price-cement-on-the-price-list.routing.module';
import { SteelPriceCementOnThePriceListService } from './shared/steel-price-cement-on-the-price-list.service';
import { SteelPriceCementOnThePriceListGuard } from './shared/steel-price-cement-on-the-price-list.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SteelPriceCementOnThePriceListListComponent,
    SteelPriceCementOnThePriceListNewComponent,
    SteelPriceCementOnThePriceListEditComponent,
    SteelPriceCementOnThePriceListViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SteelPriceCementOnThePriceListRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SteelPriceCementOnThePriceListService,
    SteelPriceCementOnThePriceListGuard
  ],
  entryComponents: [
    SteelPriceCementOnThePriceListNewComponent,
    SteelPriceCementOnThePriceListEditComponent,
    SteelPriceCementOnThePriceListViewComponent
  ]
})

export class SteelPriceCementOnThePriceListModule {
}
