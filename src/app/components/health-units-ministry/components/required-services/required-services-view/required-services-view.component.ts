
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RequiredServices } from 'app/shared/models/required-services';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RequiredServicesService } from '../shared/required-services.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-required-services-view',
  templateUrl: './required-services-view.component.html',
  styleUrls: ['./required-services-view.component.scss'],
  providers: []
})

export class RequiredServicesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRequiredServices: RequiredServices;
  requiredServicesForm: FormGroup;

  private entityNamesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;

  
entityNameSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerOrSectionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRequiredServicesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RequiredServicesViewComponent>,
    public requiredServicesService: RequiredServicesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRequiredServices = this.selectedRequiredServicesDialog.data || this.selectedRequiredServices;

    
	this.entityNameSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' اسم الجهة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' المحافظة',
	});

	this.centerOrSectionSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' مركز – قسم',
	});


    this.requiredServicesForm = this.formBuilder.group({
      
  orderNumber : [this.selectedRequiredServices.orderNumber],
  schoolName : [this.selectedRequiredServices.schoolName],
  landArea : [this.selectedRequiredServices.landArea],
  structuralRatio : [this.selectedRequiredServices.structuralRatio],
  floorsNumber : [this.selectedRequiredServices.floorsNumber],
  serviceType : [this.selectedRequiredServices.serviceType],
  serviceCode : [this.selectedRequiredServices.serviceCode],
  serviceName : [this.selectedRequiredServices.serviceName],
  advanceRequiredRatio : [this.selectedRequiredServices.advanceRequiredRatio],
  applictionDate : [this.selectedRequiredServices.applictionDate],
  entityName : [this.selectedRequiredServices.entityName],
  governorate : [this.selectedRequiredServices.governorate],
  centerOrSection : [this.selectedRequiredServices.centerOrSection]
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
    return this.requiredServicesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.requiredServicesForm.controls)) {
      this.requiredServicesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
}

