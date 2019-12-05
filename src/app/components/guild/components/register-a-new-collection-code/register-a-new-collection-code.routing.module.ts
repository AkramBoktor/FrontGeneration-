import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RegisterANewCollectionCodeGuard } from './shared/register-a-new-collection-code.guard';
import { RegisterANewCollectionCodeNewComponent } from './register-a-new-collection-code-new/register-a-new-collection-code-new.component';
import { RegisterANewCollectionCodeEditComponent } from './register-a-new-collection-code-edit/register-a-new-collection-code-edit.component';
import { RegisterANewCollectionCodeListComponent } from './register-a-new-collection-code-list/register-a-new-collection-code-list.component';
import { RegisterANewCollectionCodeViewComponent } from './register-a-new-collection-code-view/register-a-new-collection-code-view.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterANewCollectionCodeListComponent,
    canActivate: [RegisterANewCollectionCodeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RegisterANewCollectionCodeNewComponent,
    canActivate: [RegisterANewCollectionCodeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RegisterANewCollectionCodeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RegisterANewCollectionCodeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RegisterANewCollectionCodeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RegisterANewCollectionCodeRoutingModule {
}
