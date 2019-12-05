import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RegisterANewDestinationCodeGuard } from './shared/register-a-new-destination-code.guard';
import { RegisterANewDestinationCodeNewComponent } from './register-a-new-destination-code-new/register-a-new-destination-code-new.component';
import { RegisterANewDestinationCodeEditComponent } from './register-a-new-destination-code-edit/register-a-new-destination-code-edit.component';
import { RegisterANewDestinationCodeListComponent } from './register-a-new-destination-code-list/register-a-new-destination-code-list.component';
import { RegisterANewDestinationCodeViewComponent } from './register-a-new-destination-code-view/register-a-new-destination-code-view.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterANewDestinationCodeListComponent,
    canActivate: [RegisterANewDestinationCodeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RegisterANewDestinationCodeNewComponent,
    canActivate: [RegisterANewDestinationCodeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RegisterANewDestinationCodeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RegisterANewDestinationCodeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RegisterANewDestinationCodeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RegisterANewDestinationCodeRoutingModule {
}
