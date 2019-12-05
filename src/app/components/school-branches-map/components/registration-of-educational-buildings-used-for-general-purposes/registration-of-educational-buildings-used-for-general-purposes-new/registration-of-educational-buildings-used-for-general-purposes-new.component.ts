
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposes } from 'app/shared/models/registration-of-educational-buildings-used-for-general-purposes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesService } from '../shared/registration-of-educational-buildings-used-for-general-purposes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-registration-of-educational-buildings-used-for-general-purposes-new',
  templateUrl: './registration-of-educational-buildings-used-for-general-purposes-new.component.html',
  styleUrls: ['./registration-of-educational-buildings-used-for-general-purposes-new.component.scss'],
  providers: [
    ]
})

export class RegistrationOfEducationalBuildingsUsedForGeneralPurposesNewComponent extends AppBaseComponent implements OnInit {
  registrationOfEducationalBuildingsUsedForGeneralPurposesForm: FormGroup;
  @Input() selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes: RegistrationOfEducationalBuildingsUsedForGeneralPurposes;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;
private purposeOfConstructionsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
purposeCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('purposeCode', { static: true }) PurposeCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RegistrationOfEducationalBuildingsUsedForGeneralPurposesNewComponent>,
    public registrationOfEducationalBuildingsUsedForGeneralPurposesService: RegistrationOfEducationalBuildingsUsedForGeneralPurposesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes = new RegistrationOfEducationalBuildingsUsedForGeneralPurposes();

    
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
     
  id : [0],
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
    this.registrationOfEducationalBuildingsUsedForGeneralPurposesService.create(this.registrationOfEducationalBuildingsUsedForGeneralPurposesForm.value)
        .pipe(switchMap(x => {
			return this.registrationOfEducationalBuildingsUsedForGeneralPurposesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.registrationOfEducationalBuildingsUsedForGeneralPurposesForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.purposeOfConstructionsService = new LookupService('purposeofconstructions', this.http);
  }
 }
