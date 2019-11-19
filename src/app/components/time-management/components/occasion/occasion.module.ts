import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { OccasionListComponent } from './occasion-list/occasion-list.component';
import { OccasionEditComponent } from './occasion-edit/occasion-edit.component';
import { OccasionNewComponent } from './occasion-new/occasion-new.component';
import { OccasionViewComponent } from './occasion-view/occasion-view.component';
import { OccasionRoutingModule } from './occasion.routing.module';
import { OccasionService } from './shared/occasion.service';
import { OccasionGuard } from './shared/occasion.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    OccasionListComponent,
    OccasionNewComponent,
    OccasionEditComponent,
    OccasionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    OccasionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    OccasionService,
    OccasionGuard
  ],
  entryComponents: [
    OccasionNewComponent,
    OccasionEditComponent,
    OccasionViewComponent
  ]
})

export class OccasionModule {
}
