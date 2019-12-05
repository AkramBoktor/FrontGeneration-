import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ElectricityWorksListComponent } from './electricity-works-list/electricity-works-list.component';
import { ElectricityWorksEditComponent } from './electricity-works-edit/electricity-works-edit.component';
import { ElectricityWorksNewComponent } from './electricity-works-new/electricity-works-new.component';
import { ElectricityWorksViewComponent } from './electricity-works-view/electricity-works-view.component';
import { ElectricityWorksRoutingModule } from './electricity-works.routing.module';
import { ElectricityWorksService } from './shared/electricity-works.service';
import { ElectricityWorksGuard } from './shared/electricity-works.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ElectricityWorksListComponent,
    ElectricityWorksNewComponent,
    ElectricityWorksEditComponent,
    ElectricityWorksViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ElectricityWorksRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ElectricityWorksService,
    ElectricityWorksGuard
  ],
  entryComponents: [
    ElectricityWorksNewComponent,
    ElectricityWorksEditComponent,
    ElectricityWorksViewComponent
  ]
})

export class ElectricityWorksModule {
}
