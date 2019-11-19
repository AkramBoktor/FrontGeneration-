import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AuthorityResponseToNewspaperGuard } from './shared/authority-response-to-newspaper.guard';
import { AuthorityResponseToNewspaperNewComponent } from './authority-response-to-newspaper-new/authority-response-to-newspaper-new.component';
import { AuthorityResponseToNewspaperEditComponent } from './authority-response-to-newspaper-edit/authority-response-to-newspaper-edit.component';
import { AuthorityResponseToNewspaperListComponent } from './authority-response-to-newspaper-list/authority-response-to-newspaper-list.component';
import { AuthorityResponseToNewspaperViewComponent } from './authority-response-to-newspaper-view/authority-response-to-newspaper-view.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorityResponseToNewspaperListComponent,
    canActivate: [AuthorityResponseToNewspaperGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AuthorityResponseToNewspaperNewComponent,
    canActivate: [AuthorityResponseToNewspaperGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AuthorityResponseToNewspaperEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AuthorityResponseToNewspaperListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AuthorityResponseToNewspaperViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AuthorityResponseToNewspaperRoutingModule {
}
