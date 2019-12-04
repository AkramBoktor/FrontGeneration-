
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ProducingMaterialForApprovedCompanies } from 'app/shared/models/producing-material-for-approved-companies';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ProducingMaterialForApprovedCompaniesService } from '../shared/producing-material-for-approved-companies.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-producing-material-for-approved-companies-view',
  templateUrl: './producing-material-for-approved-companies-view.component.html',
  styleUrls: ['./producing-material-for-approved-companies-view.component.scss'],
  providers: []
})

export class ProducingMaterialForApprovedCompaniesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedProducingMaterialForApprovedCompanies: ProducingMaterialForApprovedCompanies;
  producingMaterialForApprovedCompaniesForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedProducingMaterialForApprovedCompaniesDialog: any,
    @Optional() public dialogRef: MatDialogRef<ProducingMaterialForApprovedCompaniesViewComponent>,
    public producingMaterialForApprovedCompaniesService: ProducingMaterialForApprovedCompaniesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProducingMaterialForApprovedCompanies = this.selectedProducingMaterialForApprovedCompaniesDialog.data || this.selectedProducingMaterialForApprovedCompanies;

    

    this.producingMaterialForApprovedCompaniesForm = this.formBuilder.group({
      
  companyCode : [this.selectedProducingMaterialForApprovedCompanies.companyCode],
  mainMaterialCode : [this.selectedProducingMaterialForApprovedCompanies.mainMaterialCode],
  subMaterialCode : [this.selectedProducingMaterialForApprovedCompanies.subMaterialCode],
  subMaterialName : [this.selectedProducingMaterialForApprovedCompanies.subMaterialName]
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
    return this.producingMaterialForApprovedCompaniesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.producingMaterialForApprovedCompaniesForm.controls)) {
      this.producingMaterialForApprovedCompaniesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

