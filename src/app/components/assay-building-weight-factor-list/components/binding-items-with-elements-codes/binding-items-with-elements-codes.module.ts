import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BindingItemsWithElementsCodesListComponent } from './binding-items-with-elements-codes-list/binding-items-with-elements-codes-list.component';
import { BindingItemsWithElementsCodesEditComponent } from './binding-items-with-elements-codes-edit/binding-items-with-elements-codes-edit.component';
import { BindingItemsWithElementsCodesNewComponent } from './binding-items-with-elements-codes-new/binding-items-with-elements-codes-new.component';
import { BindingItemsWithElementsCodesViewComponent } from './binding-items-with-elements-codes-view/binding-items-with-elements-codes-view.component';
import { BindingItemsWithElementsCodesRoutingModule } from './binding-items-with-elements-codes.routing.module';
import { BindingItemsWithElementsCodesService } from './shared/binding-items-with-elements-codes.service';
import { BindingItemsWithElementsCodesGuard } from './shared/binding-items-with-elements-codes.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BindingItemsWithElementsCodesListComponent,
    BindingItemsWithElementsCodesNewComponent,
    BindingItemsWithElementsCodesEditComponent,
    BindingItemsWithElementsCodesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BindingItemsWithElementsCodesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BindingItemsWithElementsCodesService,
    BindingItemsWithElementsCodesGuard
  ],
  entryComponents: [
    BindingItemsWithElementsCodesNewComponent,
    BindingItemsWithElementsCodesEditComponent,
    BindingItemsWithElementsCodesViewComponent
  ]
})

export class BindingItemsWithElementsCodesModule {
}
