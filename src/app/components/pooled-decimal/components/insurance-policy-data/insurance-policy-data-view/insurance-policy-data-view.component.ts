
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { InsurancePolicyData } from 'app/shared/models/insurance-policy-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { InsurancePolicyDataService } from '../shared/insurance-policy-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-insurance-policy-data-view',
  templateUrl: './insurance-policy-data-view.component.html',
  styleUrls: ['./insurance-policy-data-view.component.scss'],
  providers: []
})

export class InsurancePolicyDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInsurancePolicyData: InsurancePolicyData;
  insurancePolicyDataForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInsurancePolicyDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<InsurancePolicyDataViewComponent>,
    public insurancePolicyDataService: InsurancePolicyDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInsurancePolicyData = this.selectedInsurancePolicyDataDialog.data || this.selectedInsurancePolicyData;

    

    this.insurancePolicyDataForm = this.formBuilder.group({
      
  companyCode : [this.selectedInsurancePolicyData.companyCode],
  insurancePolicyDate : [this.selectedInsurancePolicyData.insurancePolicyDate],
  insurancePolicyCode : [this.selectedInsurancePolicyData.insurancePolicyCode],
  buildingCode : [this.selectedInsurancePolicyData.buildingCode],
  extensionCode : [this.selectedInsurancePolicyData.extensionCode],
  modelCode : [this.selectedInsurancePolicyData.modelCode],
  floorsNumber : [this.selectedInsurancePolicyData.floorsNumber],
  classroomNumber : [this.selectedInsurancePolicyData.classroomNumber],
  insuranceAmount : [this.selectedInsurancePolicyData.insuranceAmount],
  insuranceFee : [this.selectedInsurancePolicyData.insuranceFee],
  deliveryDate : [this.selectedInsurancePolicyData.deliveryDate],
  paymentReceiptNumber : [this.selectedInsurancePolicyData.paymentReceiptNumber]
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
    return this.insurancePolicyDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.insurancePolicyDataForm.controls)) {
      this.insurancePolicyDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

