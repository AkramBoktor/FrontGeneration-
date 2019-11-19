
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { JobData } from 'app/shared/models/job-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { JobDataService } from '../shared/job-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-job-data-new',
  templateUrl: './job-data-new.component.html',
  styleUrls: ['./job-data-new.component.scss'],
  providers: [
    ]
})

export class JobDataNewComponent extends AppBaseComponent implements OnInit {
  jobDataForm: FormGroup;
  @Input() selectedJobData: JobData;
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
    @Optional() public dialogRef: MatDialogRef<JobDataNewComponent>,
    public jobDataService: JobDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedJobData = new JobData();

    
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
     
  id : [0],
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
    this.jobDataService.create(this.jobDataForm.value)
        .pipe(switchMap(x => {
			return this.jobDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
