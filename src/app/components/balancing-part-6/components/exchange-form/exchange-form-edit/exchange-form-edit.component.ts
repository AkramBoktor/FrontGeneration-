
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExchangeForm } from 'app/shared/models/exchange-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExchangeFormService } from '../shared/exchange-form.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-exchange-form-edit',
  templateUrl: './exchange-form-edit.component.html',
  styleUrls: ['./exchange-form-edit.component.scss'],
  providers: []
})

export class ExchangeFormEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExchangeForm: ExchangeForm;
  exchangeFormForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private areasService: LookupService;

  
zipCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('zipCode', { static: true }) ZipCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExchangeFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExchangeFormEditComponent>,
    public exchangeFormService: ExchangeFormService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExchangeForm = new ExchangeForm();
    this.selectedExchangeForm = this.selectedExchangeFormDialog.data || this.selectedExchangeForm;

    
	this.zipCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المنطقة',
	});


    this.exchangeFormForm = this.formBuilder.group({
      
  id : [this.selectedExchangeForm.id],
  formNumber : [this.selectedExchangeForm.formNumber, [ Validators.required ]],
  formDate : [this.selectedExchangeForm.formDate, [ Validators.required ]],
  formAmount : [this.selectedExchangeForm.formAmount, [ Validators.required ]],
  formStatement : [this.selectedExchangeForm.formStatement, [ Validators.required ]],
  schoolNumber : [this.selectedExchangeForm.schoolNumber, [ Validators.required ]],
  schoolName : [this.selectedExchangeForm.schoolName, [ Validators.required ]],
  amount : [this.selectedExchangeForm.amount, [ Validators.required ]],
  total : [this.selectedExchangeForm.total, [ Validators.required ]],
  zipCode : [this.selectedExchangeForm.zipCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.exchangeFormService.update(this.exchangeFormForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.exchangeFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.exchangeFormForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
  }
}
