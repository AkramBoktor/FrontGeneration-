
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Allowance } from 'app/shared/models/allowance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AllowanceService } from '../shared/allowance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-allowance-view',
  templateUrl: './allowance-view.component.html',
  styleUrls: ['./allowance-view.component.scss'],
  providers: []
})

export class AllowanceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAllowance: Allowance;
  allowanceForm: FormGroup;

  private allowancesTypesService: LookupService;

  
allowancesTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAllowanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<AllowanceViewComponent>,
    public allowanceService: AllowanceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAllowance = this.selectedAllowanceDialog.data || this.selectedAllowance;

    
	this.allowancesTypeSelectOptions = new MaterialSelectOptions({
	 data: this.allowancesTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع البدل',
	});


    this.allowanceForm = this.formBuilder.group({
      
  employeeCode : [this.selectedAllowance.employeeCode],
  allowancesAmount : [this.selectedAllowance.allowancesAmount],
  allowancesType : [this.selectedAllowance.allowancesType]
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
    return this.allowanceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.allowanceForm.controls)) {
      this.allowanceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.allowancesTypesService = new LookupService('allowancestypes', this.http);
  }
}

