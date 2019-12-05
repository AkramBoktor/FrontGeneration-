
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CashFormAllowance } from 'app/shared/models/cash-form-allowance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CashFormAllowanceService } from '../shared/cash-form-allowance.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-cash-form-allowance-edit',
  templateUrl: './cash-form-allowance-edit.component.html',
  styleUrls: ['./cash-form-allowance-edit.component.scss'],
  providers: []
})

export class CashFormAllowanceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCashFormAllowance: CashFormAllowance;
  cashFormAllowanceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private areasService: LookupService;
private jobTypesService: LookupService;

  
requestingAreaSelectOptions: MaterialSelectOptions;
jobNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('requestingArea', { static: true }) RequestingAreaSelectComponent: MaterialSelectComponent;
	@ViewChild('jobNumber', { static: true }) JobNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCashFormAllowanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<CashFormAllowanceEditComponent>,
    public cashFormAllowanceService: CashFormAllowanceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCashFormAllowance = new CashFormAllowance();
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
      
  id : [this.selectedCashFormAllowance.id],
  formRegistrationDate : [this.selectedCashFormAllowance.formRegistrationDate, [ Validators.required ]],
  formSerial : [this.selectedCashFormAllowance.formSerial, [ Validators.required ]],
  buildingCode : [this.selectedCashFormAllowance.buildingCode, [ Validators.required ]],
  formStatus : [this.selectedCashFormAllowance.formStatus, [ Validators.required ]],
  formName : [this.selectedCashFormAllowance.formName, [ Validators.required ]],
  sectionNumber : [this.selectedCashFormAllowance.sectionNumber, [ Validators.required ]],
  sectionName : [this.selectedCashFormAllowance.sectionName, [ Validators.required ]],
  workTypeNumber : [this.selectedCashFormAllowance.workTypeNumber, [ Validators.required ]],
  businessTypeName : [this.selectedCashFormAllowance.businessTypeName, [ Validators.required ]],
  formDate : [this.selectedCashFormAllowance.formDate, [ Validators.required ]],
  numberIssuedRequestingArea : [this.selectedCashFormAllowance.numberIssuedRequestingArea, [ Validators.required ]],
  budgetDate : [this.selectedCashFormAllowance.budgetDate, [ Validators.required ]],
  netAbstract : [this.selectedCashFormAllowance.netAbstract, [ Validators.required ]],
  requestingArea : [this.selectedCashFormAllowance.requestingArea, [ Validators.required ]],
  jobNumber : [this.selectedCashFormAllowance.jobNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.cashFormAllowanceService.update(this.cashFormAllowanceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.cashFormAllowanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.cashFormAllowanceForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}
