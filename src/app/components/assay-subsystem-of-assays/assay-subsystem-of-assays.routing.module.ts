
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssaySubsystemOfAssaysComponent } from './assay-subsystem-of-assays.component';


const routes: Routes = [
  {
    path: '',
    component: AssaySubsystemOfAssaysComponent,
  },
  
{
    path: 'building-assays', loadChildren: './components/building-assays/building-assays.module#BuildingAssaysModule',
    data: {
      moduleName: 'BuildingAssays'
    },
},

{
    path: 'building-models-works', loadChildren: './components/building-models-works/building-models-works.module#BuildingModelsWorksModule',
    data: {
      moduleName: 'BuildingModelsWorks'
    },
},

{
    path: 'contractor-prices-building-assay', loadChildren: './components/contractor-prices-building-assay/contractor-prices-building-assay.module#ContractorPricesBuildingAssayModule',
    data: {
      moduleName: 'ContractorPricesBuildingAssay'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssaySubsystemOfAssaysRoutingModule {
}

