import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubcategoryCodeGuard } from './shared/subcategory-code.guard';
import { SubcategoryCodeNewComponent } from './subcategory-code-new/subcategory-code-new.component';
import { SubcategoryCodeEditComponent } from './subcategory-code-edit/subcategory-code-edit.component';
import { SubcategoryCodeListComponent } from './subcategory-code-list/subcategory-code-list.component';
import { SubcategoryCodeViewComponent } from './subcategory-code-view/subcategory-code-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubcategoryCodeListComponent,
    canActivate: [SubcategoryCodeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubcategoryCodeNewComponent,
    canActivate: [SubcategoryCodeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubcategoryCodeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubcategoryCodeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubcategoryCodeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubcategoryCodeRoutingModule {
}
