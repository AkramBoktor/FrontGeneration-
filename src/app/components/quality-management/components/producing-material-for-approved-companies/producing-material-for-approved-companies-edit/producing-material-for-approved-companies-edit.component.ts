
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ProducingMaterialForApprovedCompanies } from 'app/shared/models/producing-material-for-approved-companies';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ProducingMaterialForApprovedCompaniesService } from '../shared/producing-material-for-approved-companies.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-producing-material-for-approved-companies-edit',
  templateUrl: './producing-material-for-approved-companies-edit.component.html',
  styleUrls: ['./producing-material-for-approved-companies-edit.component.scss'],
  providers: []
})

export class ProducingMaterialForApprovedCompaniesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedProducingMaterialForApprovedCompanies: ProducingMaterialForApprovedCompanies;
  producingMaterialForApprovedCompaniesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedProducingMaterialForApprovedCompaniesDialog: any,
    @Optional() public dialogRef: MatDialogRef<ProducingMaterialForApprovedCompaniesEditComponent>,
    public producingMaterialForApprovedCompaniesService: ProducingMaterialForApprovedCompaniesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProducingMaterialForApprovedCompanies = new ProducingMaterialForApprovedCompanies();
    this.selectedProducingMaterialForApprovedCompanies = this.selectedProducingMaterialForApprovedCompaniesDialog.data || this.selectedProducingMaterialForApprovedCompanies;

    

    this.producingMaterialForApprovedCompaniesForm = this.formBuilder.group({
      
  id : [this.selectedProducingMaterialForApprovedCompanies.id],
  companyCode : [this.selectedProducingMaterialForApprovedCompanies.companyCode, [ Validators.required ]],
  mainMaterialCode : [this.selectedProducingMaterialForApprovedCompanies.mainMaterialCode, [ Validators.required ]],
  subMaterialCode : [this.selectedProducingMaterialForApprovedCompanies.subMaterialCode, [ Validators.required ]],
  subMaterialName : [this.selectedProducingMaterialForApprovedCompanies.subMaterialName, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.producingMaterialForApprovedCompaniesService.update(this.producingMaterialForApprovedCompaniesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.producingMaterialForApprovedCompaniesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.producingMaterialForApprovedCompaniesForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
