
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContractorDataQualityManagement } from 'app/shared/models/contractor-data-quality-management';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorDataQualityManagementService } from '../shared/contractor-data-quality-management.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractor-data-quality-management-view',
  templateUrl: './contractor-data-quality-management-view.component.html',
  styleUrls: ['./contractor-data-quality-management-view.component.scss'],
  providers: []
})

export class ContractorDataQualityManagementViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorDataQualityManagement: ContractorDataQualityManagement;
  contractorDataQualityManagementForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorDataQualityManagementDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorDataQualityManagementViewComponent>,
    public contractorDataQualityManagementService: ContractorDataQualityManagementService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorDataQualityManagement = this.selectedContractorDataQualityManagementDialog.data || this.selectedContractorDataQualityManagement;

    

    this.contractorDataQualityManagementForm = this.formBuilder.group({
      
  contractorCode : [this.selectedContractorDataQualityManagement.contractorCode],
  contractorName : [this.selectedContractorDataQualityManagement.contractorName]
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
    return this.contractorDataQualityManagementForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.contractorDataQualityManagementForm.controls)) {
      this.contractorDataQualityManagementForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

