import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayItemsPriceGuard } from './shared/assay-items-price.guard';
import { AssayItemsPriceNewComponent } from './assay-items-price-new/assay-items-price-new.component';
import { AssayItemsPriceEditComponent } from './assay-items-price-edit/assay-items-price-edit.component';
import { AssayItemsPriceListComponent } from './assay-items-price-list/assay-items-price-list.component';
import { AssayItemsPriceViewComponent } from './assay-items-price-view/assay-items-price-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssayItemsPriceListComponent,
    canActivate: [AssayItemsPriceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssayItemsPriceNewComponent,
    canActivate: [AssayItemsPriceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssayItemsPriceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssayItemsPriceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssayItemsPriceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayItemsPriceRoutingModule {
}
