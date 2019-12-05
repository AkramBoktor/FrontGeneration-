import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RegisterANewSubsidyCodeGuard } from './shared/register-a-new-subsidy-code.guard';
import { RegisterANewSubsidyCodeNewComponent } from './register-a-new-subsidy-code-new/register-a-new-subsidy-code-new.component';
import { RegisterANewSubsidyCodeEditComponent } from './register-a-new-subsidy-code-edit/register-a-new-subsidy-code-edit.component';
import { RegisterANewSubsidyCodeListComponent } from './register-a-new-subsidy-code-list/register-a-new-subsidy-code-list.component';
import { RegisterANewSubsidyCodeViewComponent } from './register-a-new-subsidy-code-view/register-a-new-subsidy-code-view.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterANewSubsidyCodeListComponent,
    canActivate: [RegisterANewSubsidyCodeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RegisterANewSubsidyCodeNewComponent,
    canActivate: [RegisterANewSubsidyCodeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RegisterANewSubsidyCodeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RegisterANewSubsidyCodeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RegisterANewSubsidyCodeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RegisterANewSubsidyCodeRoutingModule {
}
