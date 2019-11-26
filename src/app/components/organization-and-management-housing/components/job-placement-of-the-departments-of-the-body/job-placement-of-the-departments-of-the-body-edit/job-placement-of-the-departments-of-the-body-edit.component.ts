
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { JobPlacementOfTheDepartmentsOfTheBody } from 'app/shared/models/job-placement-of-the-departments-of-the-body';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { JobPlacementOfTheDepartmentsOfTheBodyService } from '../shared/job-placement-of-the-departments-of-the-body.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-job-placement-of-the-departments-of-the-body-edit',
  templateUrl: './job-placement-of-the-departments-of-the-body-edit.component.html',
  styleUrls: ['./job-placement-of-the-departments-of-the-body-edit.component.scss'],
  providers: []
})

export class JobPlacementOfTheDepartmentsOfTheBodyEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedJobPlacementOfTheDepartmentsOfTheBody: JobPlacementOfTheDepartmentsOfTheBody;
  jobPlacementOfTheDepartmentsOfTheBodyForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedJobPlacementOfTheDepartmentsOfTheBodyDialog: any,
    @Optional() public dialogRef: MatDialogRef<JobPlacementOfTheDepartmentsOfTheBodyEditComponent>,
    public jobPlacementOfTheDepartmentsOfTheBodyService: JobPlacementOfTheDepartmentsOfTheBodyService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedJobPlacementOfTheDepartmentsOfTheBody = new JobPlacementOfTheDepartmentsOfTheBody();
    this.selectedJobPlacementOfTheDepartmentsOfTheBody = this.selectedJobPlacementOfTheDepartmentsOfTheBodyDialog.data || this.selectedJobPlacementOfTheDepartmentsOfTheBody;

    
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
      
  id : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.id],
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
    this.jobPlacementOfTheDepartmentsOfTheBodyService.update(this.jobPlacementOfTheDepartmentsOfTheBodyForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.jobPlacementOfTheDepartmentsOfTheBodyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.jobPlacementOfTheDepartmentsOfTheBodyForm.get(name);
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}
