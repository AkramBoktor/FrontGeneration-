
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ContractorDataQualityManagement } from 'app/shared/models/contractor-data-quality-management';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ContractorDataQualityManagementService } from '../shared/contractor-data-quality-management.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contractor-data-quality-management-edit',
  templateUrl: './contractor-data-quality-management-edit.component.html',
  styleUrls: ['./contractor-data-quality-management-edit.component.scss'],
  providers: []
})

export class ContractorDataQualityManagementEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorDataQualityManagement: ContractorDataQualityManagement;
  contractorDataQualityManagementForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorDataQualityManagementDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorDataQualityManagementEditComponent>,
    public contractorDataQualityManagementService: ContractorDataQualityManagementService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorDataQualityManagement = new ContractorDataQualityManagement();
    this.selectedContractorDataQualityManagement = this.selectedContractorDataQualityManagementDialog.data || this.selectedContractorDataQualityManagement;

    

    this.contractorDataQualityManagementForm = this.formBuilder.group({
      
  id : [this.selectedContractorDataQualityManagement.id],
  contractorCode : [this.selectedContractorDataQualityManagement.contractorCode, [ Validators.required ]],
  contractorName : [this.selectedContractorDataQualityManagement.contractorName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.contractorDataQualityManagementService.update(this.contractorDataQualityManagementForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.contractorDataQualityManagementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.contractorDataQualityManagementForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
