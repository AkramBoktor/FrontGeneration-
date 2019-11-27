
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { NewServiceRequest } from 'app/shared/models/new-service-request';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { NewServiceRequestService } from '../shared/new-service-request.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-new-service-request-view',
  templateUrl: './new-service-request-view.component.html',
  styleUrls: ['./new-service-request-view.component.scss'],
  providers: []
})

export class NewServiceRequestViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNewServiceRequest: NewServiceRequest;
  newServiceRequestForm: FormGroup;

  private entityNamesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private serviceTypesService: LookupService;

  
entityNameSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerOrSectionSelectOptions: MaterialSelectOptions;
serviceTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNewServiceRequestDialog: any,
    @Optional() public dialogRef: MatDialogRef<NewServiceRequestViewComponent>,
    public newServiceRequestService: NewServiceRequestService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNewServiceRequest = this.selectedNewServiceRequestDialog.data || this.selectedNewServiceRequest;

    
	this.entityNameSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' اسم الجهة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.centerOrSectionSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' مركز – قسم',
	});

	this.serviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.serviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع  الخدمة',
	});


    this.newServiceRequestForm = this.formBuilder.group({
      
  applicationDate : [this.selectedNewServiceRequest.applicationDate],
  schoolName : [this.selectedNewServiceRequest.schoolName],
  landArea : [this.selectedNewServiceRequest.landArea],
  structuralRatio : [this.selectedNewServiceRequest.structuralRatio],
  floorsNumber : [this.selectedNewServiceRequest.floorsNumber],
  receiptNumber : [this.selectedNewServiceRequest.receiptNumber],
  receiptDate : [this.selectedNewServiceRequest.receiptDate],
  buildingCode : [this.selectedNewServiceRequest.buildingCode],
  orderNumber : [this.selectedNewServiceRequest.orderNumber],
  entityName : [this.selectedNewServiceRequest.entityName],
  governorate : [this.selectedNewServiceRequest.governorate],
  centerOrSection : [this.selectedNewServiceRequest.centerOrSection],
  serviceType : [this.selectedNewServiceRequest.serviceType]
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
    return this.newServiceRequestForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.newServiceRequestForm.controls)) {
      this.newServiceRequestForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.serviceTypesService = new LookupService('servicetypes', this.http);
  }
}

