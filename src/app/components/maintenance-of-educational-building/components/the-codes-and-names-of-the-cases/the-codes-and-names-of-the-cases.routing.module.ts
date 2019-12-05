import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TheCodesAndNamesOfTheCasesGuard } from './shared/the-codes-and-names-of-the-cases.guard';
import { TheCodesAndNamesOfTheCasesNewComponent } from './the-codes-and-names-of-the-cases-new/the-codes-and-names-of-the-cases-new.component';
import { TheCodesAndNamesOfTheCasesEditComponent } from './the-codes-and-names-of-the-cases-edit/the-codes-and-names-of-the-cases-edit.component';
import { TheCodesAndNamesOfTheCasesListComponent } from './the-codes-and-names-of-the-cases-list/the-codes-and-names-of-the-cases-list.component';
import { TheCodesAndNamesOfTheCasesViewComponent } from './the-codes-and-names-of-the-cases-view/the-codes-and-names-of-the-cases-view.component';

const routes: Routes = [
  {
    path: '',
    component: TheCodesAndNamesOfTheCasesListComponent,
    canActivate: [TheCodesAndNamesOfTheCasesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TheCodesAndNamesOfTheCasesNewComponent,
    canActivate: [TheCodesAndNamesOfTheCasesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TheCodesAndNamesOfTheCasesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TheCodesAndNamesOfTheCasesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TheCodesAndNamesOfTheCasesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TheCodesAndNamesOfTheCasesRoutingModule {
}
