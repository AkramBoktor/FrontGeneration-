import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TheCodesAndNamesOfTheCasesListComponent } from './the-codes-and-names-of-the-cases-list/the-codes-and-names-of-the-cases-list.component';
import { TheCodesAndNamesOfTheCasesEditComponent } from './the-codes-and-names-of-the-cases-edit/the-codes-and-names-of-the-cases-edit.component';
import { TheCodesAndNamesOfTheCasesNewComponent } from './the-codes-and-names-of-the-cases-new/the-codes-and-names-of-the-cases-new.component';
import { TheCodesAndNamesOfTheCasesViewComponent } from './the-codes-and-names-of-the-cases-view/the-codes-and-names-of-the-cases-view.component';
import { TheCodesAndNamesOfTheCasesRoutingModule } from './the-codes-and-names-of-the-cases.routing.module';
import { TheCodesAndNamesOfTheCasesService } from './shared/the-codes-and-names-of-the-cases.service';
import { TheCodesAndNamesOfTheCasesGuard } from './shared/the-codes-and-names-of-the-cases.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TheCodesAndNamesOfTheCasesListComponent,
    TheCodesAndNamesOfTheCasesNewComponent,
    TheCodesAndNamesOfTheCasesEditComponent,
    TheCodesAndNamesOfTheCasesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TheCodesAndNamesOfTheCasesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TheCodesAndNamesOfTheCasesService,
    TheCodesAndNamesOfTheCasesGuard
  ],
  entryComponents: [
    TheCodesAndNamesOfTheCasesNewComponent,
    TheCodesAndNamesOfTheCasesEditComponent,
    TheCodesAndNamesOfTheCasesViewComponent
  ]
})

export class TheCodesAndNamesOfTheCasesModule {
}
