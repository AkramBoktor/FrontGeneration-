
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BusinessCostChecks } from 'app/shared/models/business-cost-checks';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BusinessCostChecksService } from '../shared/business-cost-checks.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-business-cost-checks-view',
  templateUrl: './business-cost-checks-view.component.html',
  styleUrls: ['./business-cost-checks-view.component.scss'],
  providers: []
})

export class BusinessCostChecksViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBusinessCostChecks: BusinessCostChecks;
  businessCostChecksForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBusinessCostChecksDialog: any,
    @Optional() public dialogRef: MatDialogRef<BusinessCostChecksViewComponent>,
    public businessCostChecksService: BusinessCostChecksService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBusinessCostChecks = this.selectedBusinessCostChecksDialog.data || this.selectedBusinessCostChecks;

    

    this.businessCostChecksForm = this.formBuilder.group({
      
  schoolNumber : [this.selectedBusinessCostChecks.schoolNumber],
  checkNumber : [this.selectedBusinessCostChecks.checkNumber],
  checkDate : [this.selectedBusinessCostChecks.checkDate],
  checkValue : [this.selectedBusinessCostChecks.checkValue]
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
    return this.businessCostChecksForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.businessCostChecksForm.controls)) {
      this.businessCostChecksForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

