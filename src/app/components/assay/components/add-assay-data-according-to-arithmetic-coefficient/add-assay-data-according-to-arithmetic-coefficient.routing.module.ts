import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AddAssayDataAccordingToArithmeticCoefficientGuard } from './shared/add-assay-data-according-to-arithmetic-coefficient.guard';
import { AddAssayDataAccordingToArithmeticCoefficientNewComponent } from './add-assay-data-according-to-arithmetic-coefficient-new/add-assay-data-according-to-arithmetic-coefficient-new.component';
import { AddAssayDataAccordingToArithmeticCoefficientEditComponent } from './add-assay-data-according-to-arithmetic-coefficient-edit/add-assay-data-according-to-arithmetic-coefficient-edit.component';
import { AddAssayDataAccordingToArithmeticCoefficientListComponent } from './add-assay-data-according-to-arithmetic-coefficient-list/add-assay-data-according-to-arithmetic-coefficient-list.component';
import { AddAssayDataAccordingToArithmeticCoefficientViewComponent } from './add-assay-data-according-to-arithmetic-coefficient-view/add-assay-data-according-to-arithmetic-coefficient-view.component';

const routes: Routes = [
  {
    path: '',
    component: AddAssayDataAccordingToArithmeticCoefficientListComponent,
    canActivate: [AddAssayDataAccordingToArithmeticCoefficientGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AddAssayDataAccordingToArithmeticCoefficientNewComponent,
    canActivate: [AddAssayDataAccordingToArithmeticCoefficientGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AddAssayDataAccordingToArithmeticCoefficientEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AddAssayDataAccordingToArithmeticCoefficientListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AddAssayDataAccordingToArithmeticCoefficientViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AddAssayDataAccordingToArithmeticCoefficientRoutingModule {
}
