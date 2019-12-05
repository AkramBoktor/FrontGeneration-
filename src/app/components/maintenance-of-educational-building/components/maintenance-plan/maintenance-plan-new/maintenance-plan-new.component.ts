
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MaintenancePlan } from 'app/shared/models/maintenance-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MaintenancePlanService } from '../shared/maintenance-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-maintenance-plan-new',
  templateUrl: './maintenance-plan-new.component.html',
  styleUrls: ['./maintenance-plan-new.component.scss'],
  providers: [
    ]
})

export class MaintenancePlanNewComponent extends AppBaseComponent implements OnInit {
  maintenancePlanForm: FormGroup;
  @Input() selectedMaintenancePlan: MaintenancePlan;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MaintenancePlanNewComponent>,
    public maintenancePlanService: MaintenancePlanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMaintenancePlan = new MaintenancePlan();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح ',
	});


    this.maintenancePlanForm = this.formBuilder.group({
     
  id : [0],
  buildingNumber : [this.selectedMaintenancePlan.buildingNumber, [ Validators.required ]],
  branch : [this.selectedMaintenancePlan.branch, [ Validators.required ]],
  region : [this.selectedMaintenancePlan.region, [ Validators.required ]],
  yearPlan : [this.selectedMaintenancePlan.yearPlan, [ Validators.required ]],
  executionDuration : [this.selectedMaintenancePlan.executionDuration, [ Validators.required ]],
  bidNumber : [this.selectedMaintenancePlan.bidNumber, [ Validators.required ]],
  physicalLocationreceivingDate : [this.selectedMaintenancePlan.physicalLocationreceivingDate, [ Validators.required ]],
  plannerLocationReceivingDate : [this.selectedMaintenancePlan.plannerLocationReceivingDate, [ Validators.required ]],
  constructionType : [this.selectedMaintenancePlan.constructionType, [ Validators.required ]],
  offeringType : [this.selectedMaintenancePlan.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.maintenancePlanService.create(this.maintenancePlanForm.value)
        .pipe(switchMap(x => {
			return this.maintenancePlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.maintenancePlanForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
