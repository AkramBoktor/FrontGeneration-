
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CancelFromTheMaintenancePlan } from 'app/shared/models/cancel-from-the-maintenance-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CancelFromTheMaintenancePlanService } from '../shared/cancel-from-the-maintenance-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-cancel-from-the-maintenance-plan-new',
  templateUrl: './cancel-from-the-maintenance-plan-new.component.html',
  styleUrls: ['./cancel-from-the-maintenance-plan-new.component.scss'],
  providers: [
    ]
})

export class CancelFromTheMaintenancePlanNewComponent extends AppBaseComponent implements OnInit {
  cancelFromTheMaintenancePlanForm: FormGroup;
  @Input() selectedCancelFromTheMaintenancePlan: CancelFromTheMaintenancePlan;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CancelFromTheMaintenancePlanNewComponent>,
    public cancelFromTheMaintenancePlanService: CancelFromTheMaintenancePlanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCancelFromTheMaintenancePlan = new CancelFromTheMaintenancePlan();

    

    this.cancelFromTheMaintenancePlanForm = this.formBuilder.group({
     
  id : [0],
  buildinNumber : [this.selectedCancelFromTheMaintenancePlan.buildinNumber, [ Validators.required ]],
  planYear : [this.selectedCancelFromTheMaintenancePlan.planYear, [ Validators.required ]],
  maintenanceType : [this.selectedCancelFromTheMaintenancePlan.maintenanceType, [ Validators.required ]],
  exclusionReason : [this.selectedCancelFromTheMaintenancePlan.exclusionReason, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.cancelFromTheMaintenancePlanService.create(this.cancelFromTheMaintenancePlanForm.value)
        .pipe(switchMap(x => {
			return this.cancelFromTheMaintenancePlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.cancelFromTheMaintenancePlanForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
