
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TypicalFormADisbursementForm } from 'app/shared/models/typical-form-a-disbursement-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalFormADisbursementFormService } from '../shared/typical-form-a-disbursement-form.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-form-a-disbursement-form-view',
  templateUrl: './typical-form-a-disbursement-form-view.component.html',
  styleUrls: ['./typical-form-a-disbursement-form-view.component.scss'],
  providers: []
})

export class TypicalFormADisbursementFormViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalFormADisbursementForm: TypicalFormADisbursementForm;
  typicalFormADisbursementFormForm: FormGroup;

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalFormADisbursementFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalFormADisbursementFormViewComponent>,
    public typicalFormADisbursementFormService: TypicalFormADisbursementFormService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalFormADisbursementForm = this.selectedTypicalFormADisbursementFormDialog.data || this.selectedTypicalFormADisbursementForm;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.typicalFormADisbursementFormForm = this.formBuilder.group({
      
  companyName : [this.selectedTypicalFormADisbursementForm.companyName],
  bidNumber : [this.selectedTypicalFormADisbursementForm.bidNumber],
  invoiceDate : [this.selectedTypicalFormADisbursementForm.invoiceDate],
  invoicePagesNumber : [this.selectedTypicalFormADisbursementForm.invoicePagesNumber],
  billNumber : [this.selectedTypicalFormADisbursementForm.billNumber],
  offeringType : [this.selectedTypicalFormADisbursementForm.offeringType]
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
    return this.typicalFormADisbursementFormForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.typicalFormADisbursementFormForm.controls)) {
      this.typicalFormADisbursementFormForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

