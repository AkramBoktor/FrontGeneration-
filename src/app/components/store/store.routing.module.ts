
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { StoreComponent } from './store.component';


const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
  },
  
  
{
    path: 'data-for-an-item-containing-other-items', loadChildren: './components/data-for-an-item-containing-other-items/data-for-an-item-containing-other-items.module#DataForAnItemContainingOtherItemsModule',
    data: {
      moduleName: 'DataForAnItemContainingOtherItems'
    },
},

{
    path: 'transfer-his-custody-employee-to-another', loadChildren: './components/transfer-his-custody-employee-to-another/transfer-his-custody-employee-to-another.module#TransferHisCustodyEmployeeToAnotherModule',
    data: {
      moduleName: 'TransferHisCustodyEmployeeToAnother'
    },
},

{
    path: 'specialization-data', loadChildren: './components/specialization-data/specialization-data.module#SpecializationDataModule',
    data: {
      moduleName: 'SpecializationData'
    },
},

{
    path: 'data-store', loadChildren: './components/data-store/data-store.module#DataStoreModule',
    data: {
      moduleName: 'DataStore'
    },
},

{
    path: 'add-permission', loadChildren: './components/add-permission/add-permission.module#AddPermissionModule',
    data: {
      moduleName: 'AddPermission'
    },
},

{
    path: 'authorization-exchange', loadChildren: './components/authorization-exchange/authorization-exchange.module#AuthorizationExchangeModule',
    data: {
      moduleName: 'AuthorizationExchange'
    },
},

{
    path: 'add-cash-to-a-store', loadChildren: './components/add-cash-to-a-store/add-cash-to-a-store.module#AddCashToAStoreModule',
    data: {
      moduleName: 'AddCashToAStore'
    },
},

{
    path: 'return-of-custody-of-an-employee', loadChildren: './components/return-of-custody-of-an-employee/return-of-custody-of-an-employee.module#ReturnOfCustodyOfAnEmployeeModule',
    data: {
      moduleName: 'ReturnOfCustodyOfAnEmployee'
    },
},

{
    path: 'delivery-warehouses-to-keepers', loadChildren: './components/delivery-warehouses-to-keepers/delivery-warehouses-to-keepers.module#DeliveryWarehousesToKeepersModule',
    data: {
      moduleName: 'DeliveryWarehousesToKeepers'
    },
},

{
    path: 'installation-record', loadChildren: './components/installation-record/installation-record.module#InstallationRecordModule',
    data: {
      moduleName: 'InstallationRecord'
    },
},

{
    path: 'releasing-custody-by-the-authority', loadChildren: './components/releasing-custody-by-the-authority/releasing-custody-by-the-authority.module#ReleasingCustodyByTheAuthorityModule',
    data: {
      moduleName: 'ReleasingCustodyByTheAuthority'
    },
},

{
    path: 'data-item', loadChildren: './components/data-item/data-item.module#DataItemModule',
    data: {
      moduleName: 'DataItem'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class StoreRoutingModule {
}

