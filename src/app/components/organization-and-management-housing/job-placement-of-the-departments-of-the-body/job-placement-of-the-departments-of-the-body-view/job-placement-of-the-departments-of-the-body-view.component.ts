
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { JobPlacementOfTheDepartmentsOfTheBody } from 'app/shared/models/job-placement-of-the-departments-of-the-body';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { JobPlacementOfTheDepartmentsOfTheBodyService } from '../shared/job-placement-of-the-departments-of-the-body.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-job-placement-of-the-departments-of-the-body-view',
  templateUrl: './job-placement-of-the-departments-of-the-body-view.component.html',
  styleUrls: ['./job-placement-of-the-departments-of-the-body-view.component.scss'],
  providers: []
})

export class JobPlacementOfTheDepartmentsOfTheBodyViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedJobPlacementOfTheDepartmentsOfTheBody: JobPlacementOfTheDepartmentsOfTheBody;
  jobPlacementOfTheDepartmentsOfTheBodyForm: FormGroup;

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobDwellingonthemSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedJobPlacementOfTheDepartmentsOfTheBodyDialog: any,
    @Optional() public dialogRef: MatDialogRef<JobPlacementOfTheDepartmentsOfTheBodyViewComponent>,
    public jobPlacementOfTheDepartmentsOfTheBodyService: JobPlacementOfTheDepartmentsOfTheBodyService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  departmentEmployee : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.departmentEmployee],
  analgesiaDate : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.analgesiaDate],
  centralAdministration : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.centralAdministration],
  subAdministration : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.subAdministration],
  jobDwellingonthem : [this.selectedJobPlacementOfTheDepartmentsOfTheBody.jobDwellingonthem]
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
    return this.jobPlacementOfTheDepartmentsOfTheBodyForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.jobPlacementOfTheDepartmentsOfTheBodyForm.controls)) {
      this.jobPlacementOfTheDepartmentsOfTheBodyForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

