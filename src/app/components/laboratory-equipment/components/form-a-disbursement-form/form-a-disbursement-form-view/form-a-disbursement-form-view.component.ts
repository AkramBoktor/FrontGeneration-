
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormADisbursementForm } from 'app/shared/models/form-a-disbursement-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FormADisbursementFormService } from '../shared/form-a-disbursement-form.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-form-a-disbursement-form-view',
  templateUrl: './form-a-disbursement-form-view.component.html',
  styleUrls: ['./form-a-disbursement-form-view.component.scss'],
  providers: []
})

export class FormADisbursementFormViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFormADisbursementForm: FormADisbursementForm;
  formADisbursementFormForm: FormGroup;

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFormADisbursementFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<FormADisbursementFormViewComponent>,
    public formADisbursementFormService: FormADisbursementFormService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFormADisbursementForm = this.selectedFormADisbursementFormDialog.data || this.selectedFormADisbursementForm;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.formADisbursementFormForm = this.formBuilder.group({
      
  billNumber : [this.selectedFormADisbursementForm.billNumber],
  invoicePagesNumber : [this.selectedFormADisbursementForm.invoicePagesNumber],
  invoiceDate : [this.selectedFormADisbursementForm.invoiceDate],
  bidNumber : [this.selectedFormADisbursementForm.bidNumber],
  companyName : [this.selectedFormADisbursementForm.companyName],
  offeringType : [this.selectedFormADisbursementForm.offeringType]
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
    return this.formADisbursementFormForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.formADisbursementFormForm.controls)) {
      this.formADisbursementFormForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

