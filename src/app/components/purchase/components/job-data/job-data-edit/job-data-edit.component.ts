
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { JobData } from 'app/shared/models/job-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { JobDataService } from '../shared/job-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-job-data-edit',
  templateUrl: './job-data-edit.component.html',
  styleUrls: ['./job-data-edit.component.scss'],
  providers: []
})

export class JobDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedJobData: JobData;
  jobDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private buildingTypesService: LookupService;
private offeringTypesService: LookupService;
private areasService: LookupService;
private constructionTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedJobDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<JobDataEditComponent>,
    public jobDataService: JobDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedJobData = new JobData();
    this.selectedJobData = this.selectedJobDataDialog.data || this.selectedJobData;

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.jobDataForm = this.formBuilder.group({
      
  id : [this.selectedJobData.id],
  bidNumber : [this.selectedJobData.bidNumber, [ Validators.required ]],
  group : [this.selectedJobData.group, [ Validators.required ]],
  school : [this.selectedJobData.school, [ Validators.required ]],
  workOrderNumber : [this.selectedJobData.workOrderNumber, [ Validators.required ]],
  workOrderDate : [this.selectedJobData.workOrderDate, [ Validators.required ]],
  supplierNumber : [this.selectedJobData.supplierNumber, [ Validators.required ]],
  executionDuration : [this.selectedJobData.executionDuration, [ Validators.required ]],
  bouns : [this.selectedJobData.bouns, [ Validators.required ]],
  workOrderValue : [this.selectedJobData.workOrderValue, [ Validators.required ]],
  totalValue : [this.selectedJobData.totalValue, [ ]],
  maintenanceType : [this.selectedJobData.maintenanceType, [ ]],
  buildingType : [this.selectedJobData.buildingType, [ Validators.required ]],
  offeringType : [this.selectedJobData.offeringType, [ Validators.required ]],
  educationalAdministration : [this.selectedJobData.educationalAdministration, [ Validators.required ]],
  constructionType : [this.selectedJobData.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.jobDataService.update(this.jobDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.jobDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.jobDataForm.get(name);
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.areasService = new LookupService('areas', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}
