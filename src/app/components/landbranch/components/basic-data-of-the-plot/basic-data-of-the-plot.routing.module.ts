import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BasicDataOfThePlotGuard } from './shared/basic-data-of-the-plot.guard';
import { BasicDataOfThePlotNewComponent } from './basic-data-of-the-plot-new/basic-data-of-the-plot-new.component';
import { BasicDataOfThePlotEditComponent } from './basic-data-of-the-plot-edit/basic-data-of-the-plot-edit.component';
import { BasicDataOfThePlotListComponent } from './basic-data-of-the-plot-list/basic-data-of-the-plot-list.component';
import { BasicDataOfThePlotViewComponent } from './basic-data-of-the-plot-view/basic-data-of-the-plot-view.component';

const routes: Routes = [
  {
    path: '',
    component: BasicDataOfThePlotListComponent,
    canActivate: [BasicDataOfThePlotGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BasicDataOfThePlotNewComponent,
    canActivate: [BasicDataOfThePlotGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BasicDataOfThePlotEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BasicDataOfThePlotListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BasicDataOfThePlotViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BasicDataOfThePlotRoutingModule {
}
