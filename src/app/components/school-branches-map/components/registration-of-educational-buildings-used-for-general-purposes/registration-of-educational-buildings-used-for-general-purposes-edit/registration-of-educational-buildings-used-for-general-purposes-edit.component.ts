
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposes } from 'app/shared/models/registration-of-educational-buildings-used-for-general-purposes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesService } from '../shared/registration-of-educational-buildings-used-for-general-purposes.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-registration-of-educational-buildings-used-for-general-purposes-edit',
  templateUrl: './registration-of-educational-buildings-used-for-general-purposes-edit.component.html',
  styleUrls: ['./registration-of-educational-buildings-used-for-general-purposes-edit.component.scss'],
  providers: []
})

export class RegistrationOfEducationalBuildingsUsedForGeneralPurposesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes: RegistrationOfEducationalBuildingsUsedForGeneralPurposes;
  registrationOfEducationalBuildingsUsedForGeneralPurposesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private purposeOfConstructionsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
purposeCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('purposeCode', { static: true }) PurposeCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegistrationOfEducationalBuildingsUsedForGeneralPurposesEditComponent>,
    public registrationOfEducationalBuildingsUsedForGeneralPurposesService: RegistrationOfEducationalBuildingsUsedForGeneralPurposesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes = new RegistrationOfEducationalBuildingsUsedForGeneralPurposes();
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
      
  id : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.id],
  buildingCode : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.buildingCode, [ Validators.required ]],
  periodFrom : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.periodFrom, [ Validators.required ]],
  periodTo : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.periodTo, [ Validators.required ]],
  periodUsage : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.periodUsage, [ Validators.required ]],
  spaceNumber : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.spaceNumber, [ Validators.required ]],
  governorate : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.governorate, [ Validators.required ]],
  purposeCode : [this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes.purposeCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.registrationOfEducationalBuildingsUsedForGeneralPurposesService.update(this.registrationOfEducationalBuildingsUsedForGeneralPurposesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.registrationOfEducationalBuildingsUsedForGeneralPurposesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.registrationOfEducationalBuildingsUsedForGeneralPurposesForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.purposeOfConstructionsService = new LookupService('purposeofconstructions', this.http);
  }
}
