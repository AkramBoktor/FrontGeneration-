import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssayItemsPriceListComponent } from './assay-items-price-list/assay-items-price-list.component';
import { AssayItemsPriceEditComponent } from './assay-items-price-edit/assay-items-price-edit.component';
import { AssayItemsPriceNewComponent } from './assay-items-price-new/assay-items-price-new.component';
import { AssayItemsPriceViewComponent } from './assay-items-price-view/assay-items-price-view.component';
import { AssayItemsPriceRoutingModule } from './assay-items-price.routing.module';
import { AssayItemsPriceService } from './shared/assay-items-price.service';
import { AssayItemsPriceGuard } from './shared/assay-items-price.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssayItemsPriceListComponent,
    AssayItemsPriceNewComponent,
    AssayItemsPriceEditComponent,
    AssayItemsPriceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssayItemsPriceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssayItemsPriceService,
    AssayItemsPriceGuard
  ],
  entryComponents: [
    AssayItemsPriceNewComponent,
    AssayItemsPriceEditComponent,
    AssayItemsPriceViewComponent
  ]
})

export class AssayItemsPriceModule {
}
