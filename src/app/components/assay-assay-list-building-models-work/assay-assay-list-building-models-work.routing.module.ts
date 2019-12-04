
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayAssayListBuildingModelsWorkComponent } from './assay-assay-list-building-models-work.component';


const routes: Routes = [
  {
    path: '',
    component: AssayAssayListBuildingModelsWorkComponent,
  },
{
    path: 'specify-model-blank', loadChildren: './components/specify-model-blank/specify-model-blank.module#SpecifyModelBlankModule',
    data: {
      moduleName: 'SpecifyModelBlank'
    },
},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayAssayListBuildingModelsWorkRoutingModule {
}

