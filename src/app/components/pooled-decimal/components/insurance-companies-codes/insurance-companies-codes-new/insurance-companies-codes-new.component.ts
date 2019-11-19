
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { InsuranceCompaniesCodes } from 'app/shared/models/insurance-companies-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InsuranceCompaniesCodesService } from '../shared/insurance-companies-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-insurance-companies-codes-new',
  templateUrl: './insurance-companies-codes-new.component.html',
  styleUrls: ['./insurance-companies-codes-new.component.scss'],
  providers: [
    ]
})

export class InsuranceCompaniesCodesNewComponent extends AppBaseComponent implements OnInit {
  insuranceCompaniesCodesForm: FormGroup;
  @Input() selectedInsuranceCompaniesCodes: InsuranceCompaniesCodes;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<InsuranceCompaniesCodesNewComponent>,
    public insuranceCompaniesCodesService: InsuranceCompaniesCodesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInsuranceCompaniesCodes = new InsuranceCompaniesCodes();

    

    this.insuranceCompaniesCodesForm = this.formBuilder.group({
     
  id : [0],
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
    this.insuranceCompaniesCodesService.create(this.insuranceCompaniesCodesForm.value)
        .pipe(switchMap(x => {
			return this.insuranceCompaniesCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.insuranceCompaniesCodesForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
