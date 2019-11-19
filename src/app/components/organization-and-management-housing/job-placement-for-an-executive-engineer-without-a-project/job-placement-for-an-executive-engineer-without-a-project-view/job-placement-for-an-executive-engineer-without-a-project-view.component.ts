
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProject } from 'app/shared/models/job-placement-for-an-executive-engineer-without-a-project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectService } from '../shared/job-placement-for-an-executive-engineer-without-a-project.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-job-placement-for-an-executive-engineer-without-a-project-view',
  templateUrl: './job-placement-for-an-executive-engineer-without-a-project-view.component.html',
  styleUrls: ['./job-placement-for-an-executive-engineer-without-a-project-view.component.scss'],
  providers: []
})

export class JobPlacementForAnExecutiveEngineerWithoutAProjectViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedJobPlacementForAnExecutiveEngineerWithoutAProject: JobPlacementForAnExecutiveEngineerWithoutAProject;
  jobPlacementForAnExecutiveEngineerWithoutAProjectForm: FormGroup;

  private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private jobTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
jobDwellingonThemSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedJobPlacementForAnExecutiveEngineerWithoutAProjectDialog: any,
    @Optional() public dialogRef: MatDialogRef<JobPlacementForAnExecutiveEngineerWithoutAProjectViewComponent>,
    public jobPlacementForAnExecutiveEngineerWithoutAProjectService: JobPlacementForAnExecutiveEngineerWithoutAProjectService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject = this.selectedJobPlacementForAnExecutiveEngineerWithoutAProjectDialog.data || this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم',
	});

	this.jobDwellingonThemSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه المسكن عليها ',
	});


    this.jobPlacementForAnExecutiveEngineerWithoutAProjectForm = this.formBuilder.group({
      
  employeeCode : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.employeeCode],
  hiringdate : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.hiringdate],
  branchCode : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.branchCode],
  department : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.department],
  jobDwellingonThem : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.jobDwellingonThem]
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
    return this.jobPlacementForAnExecutiveEngineerWithoutAProjectForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.jobPlacementForAnExecutiveEngineerWithoutAProjectForm.controls)) {
      this.jobPlacementForAnExecutiveEngineerWithoutAProjectForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

