
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExchangeForm } from 'app/shared/models/exchange-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExchangeFormService } from '../shared/exchange-form.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-exchange-form-view',
  templateUrl: './exchange-form-view.component.html',
  styleUrls: ['./exchange-form-view.component.scss'],
  providers: []
})

export class ExchangeFormViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExchangeForm: ExchangeForm;
  exchangeFormForm: FormGroup;

  private areasService: LookupService;

  
zipCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExchangeFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExchangeFormViewComponent>,
    public exchangeFormService: ExchangeFormService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExchangeForm = this.selectedExchangeFormDialog.data || this.selectedExchangeForm;

    
	this.zipCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المنطقة',
	});


    this.exchangeFormForm = this.formBuilder.group({
      
  formNumber : [this.selectedExchangeForm.formNumber],
  formDate : [this.selectedExchangeForm.formDate],
  formAmount : [this.selectedExchangeForm.formAmount],
  formStatement : [this.selectedExchangeForm.formStatement],
  schoolNumber : [this.selectedExchangeForm.schoolNumber],
  schoolName : [this.selectedExchangeForm.schoolName],
  amount : [this.selectedExchangeForm.amount],
  total : [this.selectedExchangeForm.total],
  zipCode : [this.selectedExchangeForm.zipCode]
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
    return this.exchangeFormForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.exchangeFormForm.controls)) {
      this.exchangeFormForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
  }
}

