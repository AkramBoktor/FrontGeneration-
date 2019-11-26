
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ServicesAssociationComponent } from './services-association.component';


const routes: Routes = [
  {
    path: '',
    component: ServicesAssociationComponent,
  },
	{
		path: 'enter-the-telephone-bill', loadChildren: './components/enter-the-telephone-bill/enter-the-telephone-bill.module#EnterTheTelephoneBillModule',
		data: {
		  moduleName: 'EnterTheTelephoneBill'
		},
	},

	{
		path: 'introducing-hajj-and-umrah-grants', loadChildren: './components/introducing-hajj-and-umrah-grants/introducing-hajj-and-umrah-grants.module#IntroducingHajjAndUmrahGrantsModule',
		data: {
		  moduleName: 'IntroducingHajjAndUmrahGrants'
		},
	},

	{
		path: 'introducing-social-grants-to-participants-of-association', loadChildren: './components/introducing-social-grants-to-participants-of-association/introducing-social-grants-to-participants-of-association.module#IntroducingSocialGrantsToParticipantsOfAssociationModule',
		data: {
		  moduleName: 'IntroducingSocialGrantsToParticipantsOfAssociation'
		},
	},

	{
		path: 'record-the-value-of-telephone-bill', loadChildren: './components/record-the-value-of-telephone-bill/record-the-value-of-telephone-bill.module#RecordTheValueOfTelephoneBillModule',
		data: {
		  moduleName: 'RecordTheValueOfTelephoneBill'
		},
	},

	{
		path: 'subscribers-data-in-services-association', loadChildren: './components/subscribers-data-in-services-association/subscribers-data-in-services-association.module#SubscribersDataInServicesAssociationModule',
		data: {
		  moduleName: 'SubscribersDataInServicesAssociation'
		},
	},

	{
		path: 'entering-resort-data', loadChildren: './components/entering-resort-data/entering-resort-data.module#EnteringResortDataModule',
		data: {
		  moduleName: 'EnteringResortData'
		},
	}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ServicesAssociationRoutingModule {
}

