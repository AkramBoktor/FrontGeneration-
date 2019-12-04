import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AbstractStatementStructuralListComponent } from './abstract-statement-structural-list/abstract-statement-structural-list.component';
import { AbstractStatementStructuralEditComponent } from './abstract-statement-structural-edit/abstract-statement-structural-edit.component';
import { AbstractStatementStructuralNewComponent } from './abstract-statement-structural-new/abstract-statement-structural-new.component';
import { AbstractStatementStructuralViewComponent } from './abstract-statement-structural-view/abstract-statement-structural-view.component';
import { AbstractStatementStructuralRoutingModule } from './abstract-statement-structural.routing.module';
import { AbstractStatementStructuralService } from './shared/abstract-statement-structural.service';
import { AbstractStatementStructuralGuard } from './shared/abstract-statement-structural.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AbstractStatementStructuralListComponent,
    AbstractStatementStructuralNewComponent,
    AbstractStatementStructuralEditComponent,
    AbstractStatementStructuralViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AbstractStatementStructuralRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AbstractStatementStructuralService,
    AbstractStatementStructuralGuard
  ],
  entryComponents: [
    AbstractStatementStructuralNewComponent,
    AbstractStatementStructuralEditComponent,
    AbstractStatementStructuralViewComponent
  ]
})

export class AbstractStatementStructuralModule {
}
