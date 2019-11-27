import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AddExtensionsOnConstructionPlanListComponent } from './add-extensions-on-construction-plan-list/add-extensions-on-construction-plan-list.component';
import { AddExtensionsOnConstructionPlanEditComponent } from './add-extensions-on-construction-plan-edit/add-extensions-on-construction-plan-edit.component';
import { AddExtensionsOnConstructionPlanNewComponent } from './add-extensions-on-construction-plan-new/add-extensions-on-construction-plan-new.component';
import { AddExtensionsOnConstructionPlanViewComponent } from './add-extensions-on-construction-plan-view/add-extensions-on-construction-plan-view.component';
import { AddExtensionsOnConstructionPlanRoutingModule } from './add-extensions-on-construction-plan.routing.module';
import { AddExtensionsOnConstructionPlanService } from './shared/add-extensions-on-construction-plan.service';
import { AddExtensionsOnConstructionPlanGuard } from './shared/add-extensions-on-construction-plan.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AddExtensionsOnConstructionPlanListComponent,
    AddExtensionsOnConstructionPlanNewComponent,
    AddExtensionsOnConstructionPlanEditComponent,
    AddExtensionsOnConstructionPlanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AddExtensionsOnConstructionPlanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AddExtensionsOnConstructionPlanService,
    AddExtensionsOnConstructionPlanGuard
  ],
  entryComponents: [
    AddExtensionsOnConstructionPlanNewComponent,
    AddExtensionsOnConstructionPlanEditComponent,
    AddExtensionsOnConstructionPlanViewComponent
  ]
})

export class AddExtensionsOnConstructionPlanModule {
}
