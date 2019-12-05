
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { NewServicesRequests } from 'app/shared/models/new-services-requests';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { NewServicesRequestsService } from '../shared/new-services-requests.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-new-services-requests-view',
  templateUrl: './new-services-requests-view.component.html',
  styleUrls: ['./new-services-requests-view.component.scss'],
  providers: []
})

export class NewServicesRequestsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNewServicesRequests: NewServicesRequests;
  newServicesRequestsForm: FormGroup;

  private entityNamesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private serviceTypesService: LookupService;

  
entityNameSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerOrSectionSelectOptions: MaterialSelectOptions;
serviceTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNewServicesRequestsDialog: any,
    @Optional() public dialogRef: MatDialogRef<NewServicesRequestsViewComponent>,
    public newServicesRequestsService: NewServicesRequestsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNewServicesRequests = this.selectedNewServicesRequestsDialog.data || this.selectedNewServicesRequests;

    
	this.entityNameSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسم الجهة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.centerOrSectionSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز – قسم',
	});

	this.serviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.serviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع  الخدمة',
	});


    this.newServicesRequestsForm = this.formBuilder.group({
      
  applicationDate : [this.selectedNewServicesRequests.applicationDate],
  schoolName : [this.selectedNewServicesRequests.schoolName],
  landArea : [this.selectedNewServicesRequests.landArea],
  structuralRatio : [this.selectedNewServicesRequests.structuralRatio],
  floorsNumber : [this.selectedNewServicesRequests.floorsNumber],
  receiptNumber : [this.selectedNewServicesRequests.receiptNumber],
  receiptDate : [this.selectedNewServicesRequests.receiptDate],
  buildingCode : [this.selectedNewServicesRequests.buildingCode],
  orderNumber : [this.selectedNewServicesRequests.orderNumber],
  entityName : [this.selectedNewServicesRequests.entityName],
  governorate : [this.selectedNewServicesRequests.governorate],
  centerOrSection : [this.selectedNewServicesRequests.centerOrSection],
  serviceType : [this.selectedNewServicesRequests.serviceType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.newServicesRequestsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.newServicesRequestsForm.controls)) {
      this.newServicesRequestsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.serviceTypesService = new LookupService('servicetypes', this.http);
  }
}

