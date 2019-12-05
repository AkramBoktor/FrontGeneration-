
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TenderForBuildingsMaintenancePlan } from 'app/shared/models/tender-for-buildings-maintenance-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TenderForBuildingsMaintenancePlanService } from '../shared/tender-for-buildings-maintenance-plan.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-tender-for-buildings-maintenance-plan-edit',
  templateUrl: './tender-for-buildings-maintenance-plan-edit.component.html',
  styleUrls: ['./tender-for-buildings-maintenance-plan-edit.component.scss'],
  providers: []
})

export class TenderForBuildingsMaintenancePlanEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTenderForBuildingsMaintenancePlan: TenderForBuildingsMaintenancePlan;
  tenderForBuildingsMaintenancePlanForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTenderForBuildingsMaintenancePlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<TenderForBuildingsMaintenancePlanEditComponent>,
    public tenderForBuildingsMaintenancePlanService: TenderForBuildingsMaintenancePlanService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTenderForBuildingsMaintenancePlan = new TenderForBuildingsMaintenancePlan();
    this.selectedTenderForBuildingsMaintenancePlan = this.selectedTenderForBuildingsMaintenancePlanDialog.data || this.selectedTenderForBuildingsMaintenancePlan;

    

    this.tenderForBuildingsMaintenancePlanForm = this.formBuilder.group({
      
  id : [this.selectedTenderForBuildingsMaintenancePlan.id],
  governorate : [this.selectedTenderForBuildingsMaintenancePlan.governorate, [ Validators.required ]],
  yearPlan : [this.selectedTenderForBuildingsMaintenancePlan.yearPlan, [ Validators.required ]],
  maintenanceType : [this.selectedTenderForBuildingsMaintenancePlan.maintenanceType, [ Validators.required ]],
  buildingNumber : [this.selectedTenderForBuildingsMaintenancePlan.buildingNumber, [ Validators.required ]],
  schoolName : [this.selectedTenderForBuildingsMaintenancePlan.schoolName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.tenderForBuildingsMaintenancePlanService.update(this.tenderForBuildingsMaintenancePlanForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.tenderForBuildingsMaintenancePlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.tenderForBuildingsMaintenancePlanForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
