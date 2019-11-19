
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InsurancePolicyData } from 'app/shared/models/insurance-policy-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { InsurancePolicyDataService } from '../shared/insurance-policy-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-insurance-policy-data-edit',
  templateUrl: './insurance-policy-data-edit.component.html',
  styleUrls: ['./insurance-policy-data-edit.component.scss'],
  providers: []
})

export class InsurancePolicyDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInsurancePolicyData: InsurancePolicyData;
  insurancePolicyDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInsurancePolicyDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<InsurancePolicyDataEditComponent>,
    public insurancePolicyDataService: InsurancePolicyDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInsurancePolicyData = new InsurancePolicyData();
    this.selectedInsurancePolicyData = this.selectedInsurancePolicyDataDialog.data || this.selectedInsurancePolicyData;

    

    this.insurancePolicyDataForm = this.formBuilder.group({
      
  id : [this.selectedInsurancePolicyData.id],
  companyCode : [this.selectedInsurancePolicyData.companyCode, [ Validators.required ]],
  insurancePolicyDate : [this.selectedInsurancePolicyData.insurancePolicyDate, [ Validators.required ]],
  insurancePolicyCode : [this.selectedInsurancePolicyData.insurancePolicyCode, [ Validators.required ]],
  buildingCode : [this.selectedInsurancePolicyData.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedInsurancePolicyData.extensionCode, [ Validators.required ]],
  modelCode : [this.selectedInsurancePolicyData.modelCode, [ Validators.required ]],
  floorsNumber : [this.selectedInsurancePolicyData.floorsNumber, [ Validators.required ]],
  classroomNumber : [this.selectedInsurancePolicyData.classroomNumber, [ Validators.required ]],
  insuranceAmount : [this.selectedInsurancePolicyData.insuranceAmount, [ Validators.required ]],
  insuranceFee : [this.selectedInsurancePolicyData.insuranceFee, [ Validators.required ]],
  deliveryDate : [this.selectedInsurancePolicyData.deliveryDate, [ Validators.required ]],
  paymentReceiptNumber : [this.selectedInsurancePolicyData.paymentReceiptNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.insurancePolicyDataService.update(this.insurancePolicyDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.insurancePolicyDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.insurancePolicyDataForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
