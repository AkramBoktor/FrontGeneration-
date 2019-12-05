
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CancelFromTheMaintenancePlan } from 'app/shared/models/cancel-from-the-maintenance-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CancelFromTheMaintenancePlanService } from '../shared/cancel-from-the-maintenance-plan.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-cancel-from-the-maintenance-plan-edit',
  templateUrl: './cancel-from-the-maintenance-plan-edit.component.html',
  styleUrls: ['./cancel-from-the-maintenance-plan-edit.component.scss'],
  providers: []
})

export class CancelFromTheMaintenancePlanEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCancelFromTheMaintenancePlan: CancelFromTheMaintenancePlan;
  cancelFromTheMaintenancePlanForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCancelFromTheMaintenancePlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<CancelFromTheMaintenancePlanEditComponent>,
    public cancelFromTheMaintenancePlanService: CancelFromTheMaintenancePlanService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCancelFromTheMaintenancePlan = new CancelFromTheMaintenancePlan();
    this.selectedCancelFromTheMaintenancePlan = this.selectedCancelFromTheMaintenancePlanDialog.data || this.selectedCancelFromTheMaintenancePlan;

    

    this.cancelFromTheMaintenancePlanForm = this.formBuilder.group({
      
  id : [this.selectedCancelFromTheMaintenancePlan.id],
  buildinNumber : [this.selectedCancelFromTheMaintenancePlan.buildinNumber, [ Validators.required ]],
  planYear : [this.selectedCancelFromTheMaintenancePlan.planYear, [ Validators.required ]],
  maintenanceType : [this.selectedCancelFromTheMaintenancePlan.maintenanceType, [ Validators.required ]],
  exclusionReason : [this.selectedCancelFromTheMaintenancePlan.exclusionReason, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.cancelFromTheMaintenancePlanService.update(this.cancelFromTheMaintenancePlanForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.cancelFromTheMaintenancePlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.cancelFromTheMaintenancePlanForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
