
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposes } from 'app/shared/models/registration-of-educational-buildings-used-for-general-purposes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesService } from '../shared/registration-of-educational-buildings-used-for-general-purposes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-registration-of-educational-buildings-used-for-general-purposes-view',
  templateUrl: './registration-of-educational-buildings-used-for-general-purposes-view.component.html',
  styleUrls: ['./registration-of-educational-buildings-used-for-general-purposes-view.component.scss'],
  providers: []
})

export class RegistrationOfEducationalBuildingsUsedForGeneralPurposesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes: RegistrationOfEducationalBuildingsUsedForGeneralPurposes;
  registrationOfEducationalBuildingsUsedForGeneralPurposesForm: FormGroup;

  private governoratesService: LookupService;
private purposeOfConstructionsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
purposeCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegistrationOfEducationalBuildingsUsedForGeneralPurposesViewComponent>,
    public registrationOfEducationalBuildingsUsedForGeneralPurposesService: RegistrationOfEducationalBuildingsUsedForGeneralPurposesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes = this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposesDialog.data || this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});

	this.purposeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.purposeOfConstructionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الغرض',
	});


    this.registrationOfEducationalBuildingsUsedForGeneralPurposesForm = this.formBuilder.group({
      
  buildingCode : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.buildingCode],
  periodFrom : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.periodFrom],
  periodTo : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.periodTo],
  periodUsage : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.periodUsage],
  spaceNumber : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.spaceNumber],
  governorate : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.governorate],
  purposeCode : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.purposeCode]
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
    return this.registrationOfEducationalBuildingsUsedForGeneralPurposesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.registrationOfEducationalBuildingsUsedForGeneralPurposesForm.controls)) {
      this.registrationOfEducationalBuildingsUsedForGeneralPurposesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.purposeOfConstructionsService = new LookupService('purposeofconstructions', this.http);
  }
}

