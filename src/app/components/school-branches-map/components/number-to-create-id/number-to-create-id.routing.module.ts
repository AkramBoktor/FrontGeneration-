import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NumberToCreateIDGuard } from './shared/number-to-create-id.guard';
import { NumberToCreateIDNewComponent } from './number-to-create-id-new/number-to-create-id-new.component';
import { NumberToCreateIDEditComponent } from './number-to-create-id-edit/number-to-create-id-edit.component';
import { NumberToCreateIDListComponent } from './number-to-create-id-list/number-to-create-id-list.component';
import { NumberToCreateIDViewComponent } from './number-to-create-id-view/number-to-create-id-view.component';

const routes: Routes = [
  {
    path: '',
    component: NumberToCreateIDListComponent,
    canActivate: [NumberToCreateIDGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: NumberToCreateIDNewComponent,
    canActivate: [NumberToCreateIDGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: NumberToCreateIDEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: NumberToCreateIDListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: NumberToCreateIDViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class NumberToCreateIDRoutingModule {
}
