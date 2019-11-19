import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionNewComponent } from './promotion-new/promotion-new.component';
import { PromotionViewComponent } from './promotion-view/promotion-view.component';
import { PromotionRoutingModule } from './promotion.routing.module';
import { PromotionGuard } from './shared/promotion.guard';
import { PromotionService } from './shared/promotion.service';

@NgModule({
  declarations: [
    PromotionListComponent,
    PromotionNewComponent,
    PromotionEditComponent,
    PromotionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PromotionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PromotionService,
    PromotionGuard
  ],
  entryComponents: [
    PromotionNewComponent,
    PromotionEditComponent,
    PromotionViewComponent
  ]
})

export class PromotionModule {
}
