
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExtensionInsurancePolicyData } from 'app/shared/models/extension-insurance-policy-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExtensionInsurancePolicyDataService } from '../shared/extension-insurance-policy-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-extension-insurance-policy-data-view',
  templateUrl: './extension-insurance-policy-data-view.component.html',
  styleUrls: ['./extension-insurance-policy-data-view.component.scss'],
  providers: []
})

export class ExtensionInsurancePolicyDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExtensionInsurancePolicyData: ExtensionInsurancePolicyData;
  extensionInsurancePolicyDataForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExtensionInsurancePolicyDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExtensionInsurancePolicyDataViewComponent>,
    public extensionInsurancePolicyDataService: ExtensionInsurancePolicyDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExtensionInsurancePolicyData = this.selectedExtensionInsurancePolicyDataDialog.data || this.selectedExtensionInsurancePolicyData;

    

    this.extensionInsurancePolicyDataForm = this.formBuilder.group({
      
  buildingCode : [this.selectedExtensionInsurancePolicyData.buildingCode],
  insuranceCompany : [this.selectedExtensionInsurancePolicyData.insuranceCompany],
  modelCode : [this.selectedExtensionInsurancePolicyData.modelCode],
  floorsNumber : [this.selectedExtensionInsurancePolicyData.floorsNumber],
  classroomNumber : [this.selectedExtensionInsurancePolicyData.classroomNumber],
  extensionDate : [this.selectedExtensionInsurancePolicyData.extensionDate],
  extensionCode : [this.selectedExtensionInsurancePolicyData.extensionCode],
  extensionAmount : [this.selectedExtensionInsurancePolicyData.extensionAmount],
  insuranceFee : [this.selectedExtensionInsurancePolicyData.insuranceFee]
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
    return this.extensionInsurancePolicyDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.extensionInsurancePolicyDataForm.controls)) {
      this.extensionInsurancePolicyDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

