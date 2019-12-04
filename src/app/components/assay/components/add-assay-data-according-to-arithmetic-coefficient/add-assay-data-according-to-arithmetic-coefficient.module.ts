import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AddAssayDataAccordingToArithmeticCoefficientListComponent } from './add-assay-data-according-to-arithmetic-coefficient-list/add-assay-data-according-to-arithmetic-coefficient-list.component';
import { AddAssayDataAccordingToArithmeticCoefficientEditComponent } from './add-assay-data-according-to-arithmetic-coefficient-edit/add-assay-data-according-to-arithmetic-coefficient-edit.component';
import { AddAssayDataAccordingToArithmeticCoefficientNewComponent } from './add-assay-data-according-to-arithmetic-coefficient-new/add-assay-data-according-to-arithmetic-coefficient-new.component';
import { AddAssayDataAccordingToArithmeticCoefficientViewComponent } from './add-assay-data-according-to-arithmetic-coefficient-view/add-assay-data-according-to-arithmetic-coefficient-view.component';
import { AddAssayDataAccordingToArithmeticCoefficientRoutingModule } from './add-assay-data-according-to-arithmetic-coefficient.routing.module';
import { AddAssayDataAccordingToArithmeticCoefficientService } from './shared/add-assay-data-according-to-arithmetic-coefficient.service';
import { AddAssayDataAccordingToArithmeticCoefficientGuard } from './shared/add-assay-data-according-to-arithmetic-coefficient.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AddAssayDataAccordingToArithmeticCoefficientListComponent,
    AddAssayDataAccordingToArithmeticCoefficientNewComponent,
    AddAssayDataAccordingToArithmeticCoefficientEditComponent,
    AddAssayDataAccordingToArithmeticCoefficientViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AddAssayDataAccordingToArithmeticCoefficientRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AddAssayDataAccordingToArithmeticCoefficientService,
    AddAssayDataAccordingToArithmeticCoefficientGuard
  ],
  entryComponents: [
    AddAssayDataAccordingToArithmeticCoefficientNewComponent,
    AddAssayDataAccordingToArithmeticCoefficientEditComponent,
    AddAssayDataAccordingToArithmeticCoefficientViewComponent
  ]
})

export class AddAssayDataAccordingToArithmeticCoefficientModule {
}
