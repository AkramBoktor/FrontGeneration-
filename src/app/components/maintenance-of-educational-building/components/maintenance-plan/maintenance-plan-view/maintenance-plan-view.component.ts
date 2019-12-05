
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaintenancePlan } from 'app/shared/models/maintenance-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaintenancePlanService } from '../shared/maintenance-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-maintenance-plan-view',
  templateUrl: './maintenance-plan-view.component.html',
  styleUrls: ['./maintenance-plan-view.component.scss'],
  providers: []
})

export class MaintenancePlanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMaintenancePlan: MaintenancePlan;
  maintenancePlanForm: FormGroup;

  private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMaintenancePlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<MaintenancePlanViewComponent>,
    public maintenancePlanService: MaintenancePlanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMaintenancePlan = this.selectedMaintenancePlanDialog.data || this.selectedMaintenancePlan;

    
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
      
  buildingNumber : [this.selectedMaintenancePlan.buildingNumber],
  branch : [this.selectedMaintenancePlan.branch],
  region : [this.selectedMaintenancePlan.region],
  yearPlan : [this.selectedMaintenancePlan.yearPlan],
  executionDuration : [this.selectedMaintenancePlan.executionDuration],
  bidNumber : [this.selectedMaintenancePlan.bidNumber],
  physicalLocationreceivingDate : [this.selectedMaintenancePlan.physicalLocationreceivingDate],
  plannerLocationReceivingDate : [this.selectedMaintenancePlan.plannerLocationReceivingDate],
  constructionType : [this.selectedMaintenancePlan.constructionType],
  offeringType : [this.selectedMaintenancePlan.offeringType]
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
    return this.maintenancePlanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.maintenancePlanForm.controls)) {
      this.maintenancePlanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

