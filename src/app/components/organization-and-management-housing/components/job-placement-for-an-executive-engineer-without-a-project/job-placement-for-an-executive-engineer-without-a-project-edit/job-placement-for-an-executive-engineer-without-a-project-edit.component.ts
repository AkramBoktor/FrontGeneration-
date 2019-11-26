
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { JobPlacementForAnExecutiveEngineerWithoutAProject } from 'app/shared/models/job-placement-for-an-executive-engineer-without-a-project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { JobPlacementForAnExecutiveEngineerWithoutAProjectService } from '../shared/job-placement-for-an-executive-engineer-without-a-project.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-job-placement-for-an-executive-engineer-without-a-project-edit',
  templateUrl: './job-placement-for-an-executive-engineer-without-a-project-edit.component.html',
  styleUrls: ['./job-placement-for-an-executive-engineer-without-a-project-edit.component.scss'],
  providers: []
})

export class JobPlacementForAnExecutiveEngineerWithoutAProjectEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedJobPlacementForAnExecutiveEngineerWithoutAProject: JobPlacementForAnExecutiveEngineerWithoutAProject;
  jobPlacementForAnExecutiveEngineerWithoutAProjectForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private jobTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
jobDwellingonThemSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('jobDwellingonThem', { static: true }) JobDwellingonThemSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedJobPlacementForAnExecutiveEngineerWithoutAProjectDialog: any,
    @Optional() public dialogRef: MatDialogRef<JobPlacementForAnExecutiveEngineerWithoutAProjectEditComponent>,
    public jobPlacementForAnExecutiveEngineerWithoutAProjectService: JobPlacementForAnExecutiveEngineerWithoutAProjectService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject = new JobPlacementForAnExecutiveEngineerWithoutAProject();
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
      
  id : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.id],
  employeeCode : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.employeeCode, [ Validators.required ]],
  hiringdate : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.hiringdate, [ Validators.required ]],
  branchCode : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.branchCode, [ Validators.required ]],
  department : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.department, [ Validators.required ]],
  jobDwellingonThem : [this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject.jobDwellingonThem, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.jobPlacementForAnExecutiveEngineerWithoutAProjectService.update(this.jobPlacementForAnExecutiveEngineerWithoutAProjectForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.jobPlacementForAnExecutiveEngineerWithoutAProjectService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.jobPlacementForAnExecutiveEngineerWithoutAProjectForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}
