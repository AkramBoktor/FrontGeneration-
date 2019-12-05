import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BindingItemsWithElementsCodesGuard } from './shared/binding-items-with-elements-codes.guard';
import { BindingItemsWithElementsCodesNewComponent } from './binding-items-with-elements-codes-new/binding-items-with-elements-codes-new.component';
import { BindingItemsWithElementsCodesEditComponent } from './binding-items-with-elements-codes-edit/binding-items-with-elements-codes-edit.component';
import { BindingItemsWithElementsCodesListComponent } from './binding-items-with-elements-codes-list/binding-items-with-elements-codes-list.component';
import { BindingItemsWithElementsCodesViewComponent } from './binding-items-with-elements-codes-view/binding-items-with-elements-codes-view.component';

const routes: Routes = [
  {
    path: '',
    component: BindingItemsWithElementsCodesListComponent,
    canActivate: [BindingItemsWithElementsCodesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BindingItemsWithElementsCodesNewComponent,
    canActivate: [BindingItemsWithElementsCodesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BindingItemsWithElementsCodesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BindingItemsWithElementsCodesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BindingItemsWithElementsCodesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BindingItemsWithElementsCodesRoutingModule {
}
