import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeesPerformanceEvaluationListComponent } from './employees-performance-evaluation-list/employees-performance-evaluation-list.component';
import { EmployeesPerformanceEvaluationEditComponent } from './employees-performance-evaluation-edit/employees-performance-evaluation-edit.component';
import { EmployeesPerformanceEvaluationNewComponent } from './employees-performance-evaluation-new/employees-performance-evaluation-new.component';
import { EmployeesPerformanceEvaluationViewComponent } from './employees-performance-evaluation-view/employees-performance-evaluation-view.component';
import { EmployeesPerformanceEvaluationRoutingModule } from './employees-performance-evaluation.routing.module';
import { EmployeesPerformanceEvaluationService } from './shared/employees-performance-evaluation.service';
import { EmployeesPerformanceEvaluationGuard } from './shared/employees-performance-evaluation.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EmployeesPerformanceEvaluationListComponent,
    EmployeesPerformanceEvaluationNewComponent,
    EmployeesPerformanceEvaluationEditComponent,
    EmployeesPerformanceEvaluationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeesPerformanceEvaluationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeesPerformanceEvaluationService,
    EmployeesPerformanceEvaluationGuard
  ],
  entryComponents: [
    EmployeesPerformanceEvaluationNewComponent,
    EmployeesPerformanceEvaluationEditComponent,
    EmployeesPerformanceEvaluationViewComponent
  ]
})

export class EmployeesPerformanceEvaluationModule {
}
