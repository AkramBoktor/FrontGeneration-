import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BusinessAssayForOthersListComponent } from './business-assay-for-others-list/business-assay-for-others-list.component';
import { BusinessAssayForOthersEditComponent } from './business-assay-for-others-edit/business-assay-for-others-edit.component';
import { BusinessAssayForOthersNewComponent } from './business-assay-for-others-new/business-assay-for-others-new.component';
import { BusinessAssayForOthersViewComponent } from './business-assay-for-others-view/business-assay-for-others-view.component';
import { BusinessAssayForOthersRoutingModule } from './business-assay-for-others.routing.module';
import { BusinessAssayForOthersService } from './shared/business-assay-for-others.service';
import { BusinessAssayForOthersGuard } from './shared/business-assay-for-others.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BusinessAssayForOthersListComponent,
    BusinessAssayForOthersNewComponent,
    BusinessAssayForOthersEditComponent,
    BusinessAssayForOthersViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BusinessAssayForOthersRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BusinessAssayForOthersService,
    BusinessAssayForOthersGuard
  ],
  entryComponents: [
    BusinessAssayForOthersNewComponent,
    BusinessAssayForOthersEditComponent,
    BusinessAssayForOthersViewComponent
  ]
})

export class BusinessAssayForOthersModule {
}
