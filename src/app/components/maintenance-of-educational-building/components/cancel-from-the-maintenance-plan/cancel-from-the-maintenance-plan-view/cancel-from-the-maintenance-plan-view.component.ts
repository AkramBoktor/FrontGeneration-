
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CancelFromTheMaintenancePlan } from 'app/shared/models/cancel-from-the-maintenance-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CancelFromTheMaintenancePlanService } from '../shared/cancel-from-the-maintenance-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-cancel-from-the-maintenance-plan-view',
  templateUrl: './cancel-from-the-maintenance-plan-view.component.html',
  styleUrls: ['./cancel-from-the-maintenance-plan-view.component.scss'],
  providers: []
})

export class CancelFromTheMaintenancePlanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCancelFromTheMaintenancePlan: CancelFromTheMaintenancePlan;
  cancelFromTheMaintenancePlanForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCancelFromTheMaintenancePlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<CancelFromTheMaintenancePlanViewComponent>,
    public cancelFromTheMaintenancePlanService: CancelFromTheMaintenancePlanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCancelFromTheMaintenancePlan = this.selectedCancelFromTheMaintenancePlanDialog.data || this.selectedCancelFromTheMaintenancePlan;

    

    this.cancelFromTheMaintenancePlanForm = this.formBuilder.group({
      
  buildinNumber : [this.selectedCancelFromTheMaintenancePlan.buildinNumber],
  planYear : [this.selectedCancelFromTheMaintenancePlan.planYear],
  maintenanceType : [this.selectedCancelFromTheMaintenancePlan.maintenanceType],
  exclusionReason : [this.selectedCancelFromTheMaintenancePlan.exclusionReason]
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
    return this.cancelFromTheMaintenancePlanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.cancelFromTheMaintenancePlanForm.controls)) {
      this.cancelFromTheMaintenancePlanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

