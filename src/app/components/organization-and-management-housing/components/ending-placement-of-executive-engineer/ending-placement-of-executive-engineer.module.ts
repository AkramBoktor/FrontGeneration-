import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EndingPlacementOfExecutiveEngineerListComponent } from './ending-placement-of-executive-engineer-list/ending-placement-of-executive-engineer-list.component';
import { EndingPlacementOfExecutiveEngineerEditComponent } from './ending-placement-of-executive-engineer-edit/ending-placement-of-executive-engineer-edit.component';
import { EndingPlacementOfExecutiveEngineerNewComponent } from './ending-placement-of-executive-engineer-new/ending-placement-of-executive-engineer-new.component';
import { EndingPlacementOfExecutiveEngineerViewComponent } from './ending-placement-of-executive-engineer-view/ending-placement-of-executive-engineer-view.component';
import { EndingPlacementOfExecutiveEngineerRoutingModule } from './ending-placement-of-executive-engineer.routing.module';
import { EndingPlacementOfExecutiveEngineerService } from './shared/ending-placement-of-executive-engineer.service';
import { EndingPlacementOfExecutiveEngineerGuard } from './shared/ending-placement-of-executive-engineer.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EndingPlacementOfExecutiveEngineerListComponent,
    EndingPlacementOfExecutiveEngineerNewComponent,
    EndingPlacementOfExecutiveEngineerEditComponent,
    EndingPlacementOfExecutiveEngineerViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EndingPlacementOfExecutiveEngineerRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EndingPlacementOfExecutiveEngineerService,
    EndingPlacementOfExecutiveEngineerGuard
  ],
  entryComponents: [
    EndingPlacementOfExecutiveEngineerNewComponent,
    EndingPlacementOfExecutiveEngineerEditComponent,
    EndingPlacementOfExecutiveEngineerViewComponent
  ]
})

export class EndingPlacementOfExecutiveEngineerModule {
}
