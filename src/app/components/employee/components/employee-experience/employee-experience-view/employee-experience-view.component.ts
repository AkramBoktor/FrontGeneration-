
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeExperience } from 'app/shared/models/employee-experience';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeExperienceService } from '../shared/employee-experience.service';

@Component({
  selector: 'app-employee-experience-view',
  templateUrl: './employee-experience-view.component.html',
  styleUrls: ['./employee-experience-view.component.scss'],
  providers: []
})

export class EmployeeExperienceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeExperience: EmployeeExperience;
  employeeExperienceForm: FormGroup;

  private experiencePeriodTypesService: LookupService;
private leavingServiceReasonsService: LookupService;
private financialDegreesService: LookupService;
private jobTypesService: LookupService;

  
experienceTypeSelectOptions: MaterialSelectOptions;
leavingServiceReasonSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeExperienceDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeExperienceViewComponent>,
    public employeeExperienceService: EmployeeExperienceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeExperience = this.selectedEmployeeExperienceDialog.data || this.selectedEmployeeExperience;

    
	this.experienceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.experiencePeriodTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخبرة',
	});

	this.leavingServiceReasonSelectOptions = new MaterialSelectOptions({
	 data: this.leavingServiceReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب ترك الخدمة',
	});

	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجة المالية',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفة',
	});


    this.employeeExperienceForm = this.formBuilder.group({
      
  experienceStartDate : [this.selectedEmployeeExperience.experienceStartDate],
  experienceEndDate : [this.selectedEmployeeExperience.experienceEndDate],
  experienceEntity : [this.selectedEmployeeExperience.experienceEntity],
  unionMembershipDate : [this.selectedEmployeeExperience.unionMembershipDate],
  employeeCode : [this.selectedEmployeeExperience.employeeCode],
  experienceType : [this.selectedEmployeeExperience.experienceType],
  leavingServiceReason : [this.selectedEmployeeExperience.leavingServiceReason],
  financialDegree : [this.selectedEmployeeExperience.financialDegree],
  jobTitle : [this.selectedEmployeeExperience.jobTitle]
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
    return this.employeeExperienceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeeExperienceForm.controls)) {
      this.employeeExperienceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.experiencePeriodTypesService = new LookupService('experienceperiodtypes', this.http);
this.leavingServiceReasonsService = new LookupService('leavingservicereasons', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

