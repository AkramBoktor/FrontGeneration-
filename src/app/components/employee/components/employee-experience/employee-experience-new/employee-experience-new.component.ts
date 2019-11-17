
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeExperience } from 'app/shared/models/employee-experience';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { EmployeeExperienceService } from '../shared/employee-experience.service';


@Component({
  selector: 'app-employee-experience-new',
  templateUrl: './employee-experience-new.component.html',
  styleUrls: ['./employee-experience-new.component.scss'],
  providers: [
    ]
})

export class EmployeeExperienceNewComponent extends AppBaseComponent implements OnInit {
  employeeExperienceForm: FormGroup;
  @Input() selectedEmployeeExperience: EmployeeExperience;
  errorMessages: FormControlError[] = [
        
  ];

  private experiencePeriodTypesService: LookupService;
private leavingServiceReasonsService: LookupService;
private financialDegreesService: LookupService;
private jobTypesService: LookupService;

  
experienceTypeSelectOptions: MaterialSelectOptions;
leavingServiceReasonSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  
	@ViewChild('experienceType', { static: true }) ExperienceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('leavingServiceReason', { static: true }) LeavingServiceReasonSelectComponent: MaterialSelectComponent;
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeeExperienceNewComponent>,
    public employeeExperienceService: EmployeeExperienceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeExperience = new EmployeeExperience();

    
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
     
  id : [0],
  experienceStartDate : [this.selectedEmployeeExperience.experienceStartDate, [ Validators.required ]],
  experienceEndDate : [this.selectedEmployeeExperience.experienceEndDate, [ ]],
  experienceEntity : [this.selectedEmployeeExperience.experienceEntity, [ Validators.required ]],
  unionMembershipDate : [this.selectedEmployeeExperience.unionMembershipDate, [ Validators.required ]],
  employeeCode : [this.selectedEmployeeExperience.employeeCode, [ Validators.required ]],
  experienceType : [this.selectedEmployeeExperience.experienceType, [ Validators.required ]],
  leavingServiceReason : [this.selectedEmployeeExperience.leavingServiceReason, [ Validators.required ]],
  financialDegree : [this.selectedEmployeeExperience.financialDegree, [ Validators.required ]],
  jobTitle : [this.selectedEmployeeExperience.jobTitle, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.employeeExperienceService.create(this.employeeExperienceForm.value)
        .pipe(switchMap(x => {
			return this.employeeExperienceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeeExperienceForm.get(name);
    }

  initializeLookupServices() {
    this.experiencePeriodTypesService = new LookupService('experienceperiodtypes', this.http);
this.leavingServiceReasonsService = new LookupService('leavingservicereasons', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
 }
