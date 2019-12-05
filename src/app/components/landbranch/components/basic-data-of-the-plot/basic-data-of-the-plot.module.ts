import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BasicDataOfThePlotListComponent } from './basic-data-of-the-plot-list/basic-data-of-the-plot-list.component';
import { BasicDataOfThePlotEditComponent } from './basic-data-of-the-plot-edit/basic-data-of-the-plot-edit.component';
import { BasicDataOfThePlotNewComponent } from './basic-data-of-the-plot-new/basic-data-of-the-plot-new.component';
import { BasicDataOfThePlotViewComponent } from './basic-data-of-the-plot-view/basic-data-of-the-plot-view.component';
import { BasicDataOfThePlotRoutingModule } from './basic-data-of-the-plot.routing.module';
import { BasicDataOfThePlotService } from './shared/basic-data-of-the-plot.service';
import { BasicDataOfThePlotGuard } from './shared/basic-data-of-the-plot.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BasicDataOfThePlotListComponent,
    BasicDataOfThePlotNewComponent,
    BasicDataOfThePlotEditComponent,
    BasicDataOfThePlotViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BasicDataOfThePlotRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BasicDataOfThePlotService,
    BasicDataOfThePlotGuard
  ],
  entryComponents: [
    BasicDataOfThePlotNewComponent,
    BasicDataOfThePlotEditComponent,
    BasicDataOfThePlotViewComponent
  ]
})

export class BasicDataOfThePlotModule {
}
