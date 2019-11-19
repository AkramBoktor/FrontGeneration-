import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeeCardDefinitionListComponent } from './employee-card-definition-list/employee-card-definition-list.component';
import { EmployeeCardDefinitionEditComponent } from './employee-card-definition-edit/employee-card-definition-edit.component';
import { EmployeeCardDefinitionNewComponent } from './employee-card-definition-new/employee-card-definition-new.component';
import { EmployeeCardDefinitionViewComponent } from './employee-card-definition-view/employee-card-definition-view.component';
import { EmployeeCardDefinitionRoutingModule } from './employee-card-definition.routing.module';
import { EmployeeCardDefinitionService } from './shared/employee-card-definition.service';
import { EmployeeCardDefinitionGuard } from './shared/employee-card-definition.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EmployeeCardDefinitionListComponent,
    EmployeeCardDefinitionNewComponent,
    EmployeeCardDefinitionEditComponent,
    EmployeeCardDefinitionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeeCardDefinitionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeeCardDefinitionService,
    EmployeeCardDefinitionGuard
  ],
  entryComponents: [
    EmployeeCardDefinitionNewComponent,
    EmployeeCardDefinitionEditComponent,
    EmployeeCardDefinitionViewComponent
  ]
})

export class EmployeeCardDefinitionModule {
}
