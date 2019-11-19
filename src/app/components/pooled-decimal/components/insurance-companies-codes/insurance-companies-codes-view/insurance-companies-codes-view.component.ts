
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { InsuranceCompaniesCodes } from 'app/shared/models/insurance-companies-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { InsuranceCompaniesCodesService } from '../shared/insurance-companies-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-insurance-companies-codes-view',
  templateUrl: './insurance-companies-codes-view.component.html',
  styleUrls: ['./insurance-companies-codes-view.component.scss'],
  providers: []
})

export class InsuranceCompaniesCodesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInsuranceCompaniesCodes: InsuranceCompaniesCodes;
  insuranceCompaniesCodesForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInsuranceCompaniesCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<InsuranceCompaniesCodesViewComponent>,
    public insuranceCompaniesCodesService: InsuranceCompaniesCodesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInsuranceCompaniesCodes = this.selectedInsuranceCompaniesCodesDialog.data || this.selectedInsuranceCompaniesCodes;

    

    this.insuranceCompaniesCodesForm = this.formBuilder.group({
      
  companionsCode : [this.selectedInsuranceCompaniesCodes.companionsCode],
  companionsName : [this.selectedInsuranceCompaniesCodes.companionsName],
  companyAddress : [this.selectedInsuranceCompaniesCodes.companyAddress],
  companyPhone : [this.selectedInsuranceCompaniesCodes.companyPhone],
  companyFax : [this.selectedInsuranceCompaniesCodes.companyFax]
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
    return this.insuranceCompaniesCodesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.insuranceCompaniesCodesForm.controls)) {
      this.insuranceCompaniesCodesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

