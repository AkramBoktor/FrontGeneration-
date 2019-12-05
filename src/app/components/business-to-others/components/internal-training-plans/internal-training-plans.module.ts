import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { InternalTrainingPlansListComponent } from './internal-training-plans-list/internal-training-plans-list.component';
import { InternalTrainingPlansEditComponent } from './internal-training-plans-edit/internal-training-plans-edit.component';
import { InternalTrainingPlansNewComponent } from './internal-training-plans-new/internal-training-plans-new.component';
import { InternalTrainingPlansViewComponent } from './internal-training-plans-view/internal-training-plans-view.component';
import { InternalTrainingPlansRoutingModule } from './internal-training-plans.routing.module';
import { InternalTrainingPlansService } from './shared/internal-training-plans.service';
import { InternalTrainingPlansGuard } from './shared/internal-training-plans.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    InternalTrainingPlansListComponent,
    InternalTrainingPlansNewComponent,
    InternalTrainingPlansEditComponent,
    InternalTrainingPlansViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    InternalTrainingPlansRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    InternalTrainingPlansService,
    InternalTrainingPlansGuard
  ],
  entryComponents: [
    InternalTrainingPlansNewComponent,
    InternalTrainingPlansEditComponent,
    InternalTrainingPlansViewComponent
  ]
})

export class InternalTrainingPlansModule {
}
