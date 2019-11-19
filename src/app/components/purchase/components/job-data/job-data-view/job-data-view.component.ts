
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { JobData } from 'app/shared/models/job-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { JobDataService } from '../shared/job-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-job-data-view',
  templateUrl: './job-data-view.component.html',
  styleUrls: ['./job-data-view.component.scss'],
  providers: []
})

export class JobDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedJobData: JobData;
  jobDataForm: FormGroup;

  private buildingTypesService: LookupService;
private offeringTypesService: LookupService;
private areasService: LookupService;
private constructionTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedJobDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<JobDataViewComponent>,
    public jobDataService: JobDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  bidNumber : [this.selectedJobData.bidNumber],
  group : [this.selectedJobData.group],
  school : [this.selectedJobData.school],
  workOrderNumber : [this.selectedJobData.workOrderNumber],
  workOrderDate : [this.selectedJobData.workOrderDate],
  supplierNumber : [this.selectedJobData.supplierNumber],
  executionDuration : [this.selectedJobData.executionDuration],
  bouns : [this.selectedJobData.bouns],
  workOrderValue : [this.selectedJobData.workOrderValue],
  totalValue : [this.selectedJobData.totalValue],
  maintenanceType : [this.selectedJobData.maintenanceType],
  buildingType : [this.selectedJobData.buildingType],
  offeringType : [this.selectedJobData.offeringType],
  educationalAdministration : [this.selectedJobData.educationalAdministration],
  constructionType : [this.selectedJobData.constructionType]
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
    return this.jobDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.jobDataForm.controls)) {
      this.jobDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.areasService = new LookupService('areas', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

