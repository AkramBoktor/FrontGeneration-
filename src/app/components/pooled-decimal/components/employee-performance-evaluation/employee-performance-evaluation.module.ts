import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeePerformanceEvaluationListComponent } from './employee-performance-evaluation-list/employee-performance-evaluation-list.component';
import { EmployeePerformanceEvaluationEditComponent } from './employee-performance-evaluation-edit/employee-performance-evaluation-edit.component';
import { EmployeePerformanceEvaluationNewComponent } from './employee-performance-evaluation-new/employee-performance-evaluation-new.component';
import { EmployeePerformanceEvaluationViewComponent } from './employee-performance-evaluation-view/employee-performance-evaluation-view.component';
import { EmployeePerformanceEvaluationRoutingModule } from './employee-performance-evaluation.routing.module';
import { EmployeePerformanceEvaluationService } from './shared/employee-performance-evaluation.service';
import { EmployeePerformanceEvaluationGuard } from './shared/employee-performance-evaluation.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EmployeePerformanceEvaluationListComponent,
    EmployeePerformanceEvaluationNewComponent,
    EmployeePerformanceEvaluationEditComponent,
    EmployeePerformanceEvaluationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeePerformanceEvaluationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeePerformanceEvaluationService,
    EmployeePerformanceEvaluationGuard
  ],
  entryComponents: [
    EmployeePerformanceEvaluationNewComponent,
    EmployeePerformanceEvaluationEditComponent,
    EmployeePerformanceEvaluationViewComponent
  ]
})

export class EmployeePerformanceEvaluationModule {
}
