
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InsuranceCompaniesCodes } from 'app/shared/models/insurance-companies-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { InsuranceCompaniesCodesService } from '../shared/insurance-companies-codes.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-insurance-companies-codes-edit',
  templateUrl: './insurance-companies-codes-edit.component.html',
  styleUrls: ['./insurance-companies-codes-edit.component.scss'],
  providers: []
})

export class InsuranceCompaniesCodesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInsuranceCompaniesCodes: InsuranceCompaniesCodes;
  insuranceCompaniesCodesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInsuranceCompaniesCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<InsuranceCompaniesCodesEditComponent>,
    public insuranceCompaniesCodesService: InsuranceCompaniesCodesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInsuranceCompaniesCodes = new InsuranceCompaniesCodes();
    this.selectedInsuranceCompaniesCodes = this.selectedInsuranceCompaniesCodesDialog.data || this.selectedInsuranceCompaniesCodes;

    

    this.insuranceCompaniesCodesForm = this.formBuilder.group({
      
  id : [this.selectedInsuranceCompaniesCodes.id],
  companionsCode : [this.selectedInsuranceCompaniesCodes.companionsCode, [ Validators.required ]],
  companionsName : [this.selectedInsuranceCompaniesCodes.companionsName, [ Validators.required ]],
  companyAddress : [this.selectedInsuranceCompaniesCodes.companyAddress, [ Validators.required ]],
  companyPhone : [this.selectedInsuranceCompaniesCodes.companyPhone, [ Validators.required ]],
  companyFax : [this.selectedInsuranceCompaniesCodes.companyFax, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.insuranceCompaniesCodesService.update(this.insuranceCompaniesCodesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.insuranceCompaniesCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.insuranceCompaniesCodesForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
