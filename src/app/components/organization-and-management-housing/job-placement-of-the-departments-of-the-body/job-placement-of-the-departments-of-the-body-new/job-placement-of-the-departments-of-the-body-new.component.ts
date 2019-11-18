
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { JobPlacementOfTheDepartmentsOfTheBody } from 'app/shared/models/job-placement-of-the-departments-of-the-body';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { JobPlacementOfTheDepartmentsOfTheBodyService } from '../shared/job-placement-of-the-departments-of-the-body.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-job-placement-of-the-departments-of-the-body-new',
  templateUrl: './job-placement-of-the-departments-of-the-body-new.component.html',
  styleUrls: ['./job-placement-of-the-departments-of-the-body-new.component.scss'],
  providers: [
    ]
})

export class JobPlacementOfTheDepartmentsOfTheBodyNewComponent extends AppBaseComponent implements OnInit {
  jobPlacementOfTheDepartmentsOfTheBodyForm: FormGroup;
  @Input() selectedJobPlacementOfTheDepartmentsOfTheBody: JobPlacementOfTheDepartmentsOfTheBody;
  errorMessages: FormControlError[] = [
        
  ];

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobDwellingonthemSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('jobDwellingonthem', { static: true }) JobDwellingonthemSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<JobPlacementOfTheDepartmentsOfTheBodyNewComponent>,
    public jobPlacementOfTheDepartmentsOfTheBodyService: JobPlacementOfTheDepartmentsOfTheBodyService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedJobPlacementOfTheDepartmentsOfTheBody = new JobPlacementOfTheDepartmentsOfTheBody();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});

	this.jobDwellingonthemSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه المسكن عليها ',
	});


    this.jobPlacementOfTheDepartmentsOfTheBodyForm = this.formBuilder.group({
     
  id : [0],
  departmentEmployee : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.departmentEmployee, [ Validators.required ]],
  analgesiaDate : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.analgesiaDate, [ Validators.required ]],
  centralAdministration : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.centralAdministration, [ Validators.required ]],
  subAdministration : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.subAdministration, [ Validators.required ]],
  jobDwellingonthem : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.jobDwellingonthem, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.jobPlacementOfTheDepartmentsOfTheBodyService.create(this.jobPlacementOfTheDepartmentsOfTheBodyForm.value)
        .pipe(switchMap(x => {
			return this.jobPlacementOfTheDepartmentsOfTheBodyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.jobPlacementOfTheDepartmentsOfTheBodyForm.get(name);
    }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
 }
