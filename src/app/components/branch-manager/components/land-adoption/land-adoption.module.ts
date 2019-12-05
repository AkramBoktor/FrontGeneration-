import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LandAdoptionListComponent } from './land-adoption-list/land-adoption-list.component';
import { LandAdoptionEditComponent } from './land-adoption-edit/land-adoption-edit.component';
import { LandAdoptionNewComponent } from './land-adoption-new/land-adoption-new.component';
import { LandAdoptionViewComponent } from './land-adoption-view/land-adoption-view.component';
import { LandAdoptionRoutingModule } from './land-adoption.routing.module';
import { LandAdoptionService } from './shared/land-adoption.service';
import { LandAdoptionGuard } from './shared/land-adoption.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LandAdoptionListComponent,
    LandAdoptionNewComponent,
    LandAdoptionEditComponent,
    LandAdoptionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LandAdoptionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LandAdoptionService,
    LandAdoptionGuard
  ],
  entryComponents: [
    LandAdoptionNewComponent,
    LandAdoptionEditComponent,
    LandAdoptionViewComponent
  ]
})

export class LandAdoptionModule {
}
