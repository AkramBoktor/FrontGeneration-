
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CashFormAllowance } from 'app/shared/models/cash-form-allowance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CashFormAllowanceService } from '../shared/cash-form-allowance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-cash-form-allowance-view',
  templateUrl: './cash-form-allowance-view.component.html',
  styleUrls: ['./cash-form-allowance-view.component.scss'],
  providers: []
})

export class CashFormAllowanceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCashFormAllowance: CashFormAllowance;
  cashFormAllowanceForm: FormGroup;

  private areasService: LookupService;
private jobTypesService: LookupService;

  
requestingAreaSelectOptions: MaterialSelectOptions;
jobNumberSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCashFormAllowanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<CashFormAllowanceViewComponent>,
    public cashFormAllowanceService: CashFormAllowanceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCashFormAllowance = this.selectedCashFormAllowanceDialog.data || this.selectedCashFormAllowance;

    
	this.requestingAreaSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقة الطالبة',
	});

	this.jobNumberSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الوظيفة',
	});


    this.cashFormAllowanceForm = this.formBuilder.group({
      
  formRegistrationDate : [this.selectedCashFormAllowance.formRegistrationDate],
  formSerial : [this.selectedCashFormAllowance.formSerial],
  buildingCode : [this.selectedCashFormAllowance.buildingCode],
  formStatus : [this.selectedCashFormAllowance.formStatus],
  formName : [this.selectedCashFormAllowance.formName],
  sectionNumber : [this.selectedCashFormAllowance.sectionNumber],
  sectionName : [this.selectedCashFormAllowance.sectionName],
  workTypeNumber : [this.selectedCashFormAllowance.workTypeNumber],
  businessTypeName : [this.selectedCashFormAllowance.businessTypeName],
  formDate : [this.selectedCashFormAllowance.formDate],
  numberIssuedRequestingArea : [this.selectedCashFormAllowance.numberIssuedRequestingArea],
  budgetDate : [this.selectedCashFormAllowance.budgetDate],
  netAbstract : [this.selectedCashFormAllowance.netAbstract],
  requestingArea : [this.selectedCashFormAllowance.requestingArea],
  jobNumber : [this.selectedCashFormAllowance.jobNumber]
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
    return this.cashFormAllowanceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.cashFormAllowanceForm.controls)) {
      this.cashFormAllowanceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

