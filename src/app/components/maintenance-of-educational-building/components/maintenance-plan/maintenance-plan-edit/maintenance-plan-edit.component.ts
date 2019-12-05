
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaintenancePlan } from 'app/shared/models/maintenance-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MaintenancePlanService } from '../shared/maintenance-plan.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-maintenance-plan-edit',
  templateUrl: './maintenance-plan-edit.component.html',
  styleUrls: ['./maintenance-plan-edit.component.scss'],
  providers: []
})

export class MaintenancePlanEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMaintenancePlan: MaintenancePlan;
  maintenancePlanForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMaintenancePlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<MaintenancePlanEditComponent>,
    public maintenancePlanService: MaintenancePlanService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMaintenancePlan = new MaintenancePlan();
    this.selectedMaintenancePlan = this.selectedMaintenancePlanDialog.data || this.selectedMaintenancePlan;

    

    this.maintenancePlanForm = this.formBuilder.group({
      
  id : [this.selectedMaintenancePlan.id],
  buildingNumber : [this.selectedMaintenancePlan.buildingNumber, [ Validators.required ]],
  branch : [this.selectedMaintenancePlan.branch, [ Validators.required ]],
  region : [this.selectedMaintenancePlan.region, [ Validators.required ]],
  yearPlan : [this.selectedMaintenancePlan.yearPlan, [ Validators.required ]],
  constructionType : [this.selectedMaintenancePlan.constructionType, [ Validators.required ]],
  executionDuration : [this.selectedMaintenancePlan.executionDuration, [ Validators.required ]],
  bidNumber : [this.selectedMaintenancePlan.bidNumber, [ Validators.required ]],
  offeringType : [this.selectedMaintenancePlan.offeringType, [ Validators.required ]],
  physicalLocationreceivingDate : [this.selectedMaintenancePlan.physicalLocationreceivingDate, [ Validators.required ]],
  plannerLocationReceivingDate : [this.selectedMaintenancePlan.plannerLocationReceivingDate, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.maintenancePlanService.update(this.maintenancePlanForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.maintenancePlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.maintenancePlanForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
