import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AbstractSalaryListComponent } from './abstract-salary-list/abstract-salary-list.component';
import { AbstractSalaryEditComponent } from './abstract-salary-edit/abstract-salary-edit.component';
import { AbstractSalaryNewComponent } from './abstract-salary-new/abstract-salary-new.component';
import { AbstractSalaryViewComponent } from './abstract-salary-view/abstract-salary-view.component';
import { AbstractSalaryRoutingModule } from './abstract-salary.routing.module';
import { AbstractSalaryService } from './shared/abstract-salary.service';
import { AbstractSalaryGuard } from './shared/abstract-salary.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AbstractSalaryListComponent,
    AbstractSalaryNewComponent,
    AbstractSalaryEditComponent,
    AbstractSalaryViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AbstractSalaryRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AbstractSalaryService,
    AbstractSalaryGuard
  ],
  entryComponents: [
    AbstractSalaryNewComponent,
    AbstractSalaryEditComponent,
    AbstractSalaryViewComponent
  ]
})

export class AbstractSalaryModule {
}
