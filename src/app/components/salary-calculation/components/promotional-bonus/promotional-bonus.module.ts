import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PromotionalBonusListComponent } from './promotional-bonus-list/promotional-bonus-list.component';
import { PromotionalBonusEditComponent } from './promotional-bonus-edit/promotional-bonus-edit.component';
import { PromotionalBonusNewComponent } from './promotional-bonus-new/promotional-bonus-new.component';
import { PromotionalBonusViewComponent } from './promotional-bonus-view/promotional-bonus-view.component';
import { PromotionalBonusRoutingModule } from './promotional-bonus.routing.module';
import { PromotionalBonusService } from './shared/promotional-bonus.service';
import { PromotionalBonusGuard } from './shared/promotional-bonus.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PromotionalBonusListComponent,
    PromotionalBonusNewComponent,
    PromotionalBonusEditComponent,
    PromotionalBonusViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PromotionalBonusRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PromotionalBonusService,
    PromotionalBonusGuard
  ],
  entryComponents: [
    PromotionalBonusNewComponent,
    PromotionalBonusEditComponent,
    PromotionalBonusViewComponent
  ]
})

export class PromotionalBonusModule {
}
