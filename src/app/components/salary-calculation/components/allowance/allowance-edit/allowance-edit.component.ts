
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Allowance } from 'app/shared/models/allowance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AllowanceService } from '../shared/allowance.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-allowance-edit',
  templateUrl: './allowance-edit.component.html',
  styleUrls: ['./allowance-edit.component.scss'],
  providers: []
})

export class AllowanceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAllowance: Allowance;
  allowanceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAllowanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<AllowanceEditComponent>,
    public allowanceService: AllowanceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAllowance = new Allowance();
    this.selectedAllowance = this.selectedAllowanceDialog.data || this.selectedAllowance;

    

    this.allowanceForm = this.formBuilder.group({
      
  id : [this.selectedAllowance.id],
  employeeCode : [this.selectedAllowance.employeeCode, [ Validators.required ]],
  allowancesType : [this.selectedAllowance.allowancesType, [ Validators.required ]],
  allowancesAmount : [this.selectedAllowance.allowancesAmount, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.allowanceService.update(this.allowanceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.allowanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.allowanceForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
