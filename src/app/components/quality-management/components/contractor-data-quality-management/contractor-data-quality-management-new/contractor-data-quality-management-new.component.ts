
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContractorDataQualityManagement } from 'app/shared/models/contractor-data-quality-management';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorDataQualityManagementService } from '../shared/contractor-data-quality-management.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contractor-data-quality-management-new',
  templateUrl: './contractor-data-quality-management-new.component.html',
  styleUrls: ['./contractor-data-quality-management-new.component.scss'],
  providers: [
    ]
})

export class ContractorDataQualityManagementNewComponent extends AppBaseComponent implements OnInit {
  contractorDataQualityManagementForm: FormGroup;
  @Input() selectedContractorDataQualityManagement: ContractorDataQualityManagement;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ContractorDataQualityManagementNewComponent>,
    public contractorDataQualityManagementService: ContractorDataQualityManagementService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorDataQualityManagement = new ContractorDataQualityManagement();

    

    this.contractorDataQualityManagementForm = this.formBuilder.group({
     
  id : [0],
  contractorCode : [this.selectedContractorDataQualityManagement.contractorCode, [ Validators.required ]],
  contractorName : [this.selectedContractorDataQualityManagement.contractorName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.contractorDataQualityManagementService.create(this.contractorDataQualityManagementForm.value)
        .pipe(switchMap(x => {
			return this.contractorDataQualityManagementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.contractorDataQualityManagementForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
