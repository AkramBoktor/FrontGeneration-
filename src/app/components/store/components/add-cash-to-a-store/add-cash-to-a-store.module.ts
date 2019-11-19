import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AddCashToAStoreListComponent } from './add-cash-to-a-store-list/add-cash-to-a-store-list.component';
import { AddCashToAStoreEditComponent } from './add-cash-to-a-store-edit/add-cash-to-a-store-edit.component';
import { AddCashToAStoreNewComponent } from './add-cash-to-a-store-new/add-cash-to-a-store-new.component';
import { AddCashToAStoreViewComponent } from './add-cash-to-a-store-view/add-cash-to-a-store-view.component';
import { AddCashToAStoreRoutingModule } from './add-cash-to-a-store.routing.module';
import { AddCashToAStoreService } from './shared/add-cash-to-a-store.service';
import { AddCashToAStoreGuard } from './shared/add-cash-to-a-store.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AddCashToAStoreListComponent,
    AddCashToAStoreNewComponent,
    AddCashToAStoreEditComponent,
    AddCashToAStoreViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AddCashToAStoreRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AddCashToAStoreService,
    AddCashToAStoreGuard
  ],
  entryComponents: [
    AddCashToAStoreNewComponent,
    AddCashToAStoreEditComponent,
    AddCashToAStoreViewComponent
  ]
})

export class AddCashToAStoreModule {
}
