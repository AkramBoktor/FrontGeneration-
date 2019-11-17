
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BusinessCostChecks } from 'app/shared/models/business-cost-checks';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BusinessCostChecksService } from '../shared/business-cost-checks.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-business-cost-checks-edit',
  templateUrl: './business-cost-checks-edit.component.html',
  styleUrls: ['./business-cost-checks-edit.component.scss'],
  providers: []
})

export class BusinessCostChecksEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBusinessCostChecks: BusinessCostChecks;
  businessCostChecksForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBusinessCostChecksDialog: any,
    @Optional() public dialogRef: MatDialogRef<BusinessCostChecksEditComponent>,
    public businessCostChecksService: BusinessCostChecksService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBusinessCostChecks = new BusinessCostChecks();
    this.selectedBusinessCostChecks = this.selectedBusinessCostChecksDialog.data || this.selectedBusinessCostChecks;

    

    this.businessCostChecksForm = this.formBuilder.group({
      
  id : [this.selectedBusinessCostChecks.id],
  schoolNumber : [this.selectedBusinessCostChecks.schoolNumber, [ Validators.required ]],
  checkNumber : [this.selectedBusinessCostChecks.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedBusinessCostChecks.checkDate, [ Validators.required ]],
  checkValue : [this.selectedBusinessCostChecks.checkValue, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.businessCostChecksService.update(this.businessCostChecksForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.businessCostChecksService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.businessCostChecksForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
