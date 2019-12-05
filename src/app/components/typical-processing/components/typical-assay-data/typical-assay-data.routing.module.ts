import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalAssayDataGuard } from './shared/typical-assay-data.guard';
import { TypicalAssayDataNewComponent } from './typical-assay-data-new/typical-assay-data-new.component';
import { TypicalAssayDataEditComponent } from './typical-assay-data-edit/typical-assay-data-edit.component';
import { TypicalAssayDataListComponent } from './typical-assay-data-list/typical-assay-data-list.component';
import { TypicalAssayDataViewComponent } from './typical-assay-data-view/typical-assay-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: TypicalAssayDataListComponent,
    canActivate: [TypicalAssayDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TypicalAssayDataNewComponent,
    canActivate: [TypicalAssayDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TypicalAssayDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TypicalAssayDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TypicalAssayDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalAssayDataRoutingModule {
}
