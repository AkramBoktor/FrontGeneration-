
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ElectronicPaymentForm } from 'app/shared/models/electronic-payment-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ElectronicPaymentFormService } from '../shared/electronic-payment-form.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-electronic-payment-form-view',
  templateUrl: './electronic-payment-form-view.component.html',
  styleUrls: ['./electronic-payment-form-view.component.scss'],
  providers: []
})

export class ElectronicPaymentFormViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedElectronicPaymentForm: ElectronicPaymentForm;
  electronicPaymentFormForm: FormGroup;

  private areasService: LookupService;
private paidTypesService: LookupService;

  
areaNumberSelectOptions: MaterialSelectOptions;
paidTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedElectronicPaymentFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<ElectronicPaymentFormViewComponent>,
    public electronicPaymentFormService: ElectronicPaymentFormService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElectronicPaymentForm = this.selectedElectronicPaymentFormDialog.data || this.selectedElectronicPaymentForm;

    
	this.areaNumberSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المنطقه الطالبه',
	});

	this.paidTypeSelectOptions = new MaterialSelectOptions({
	 data: this.paidTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المدفوع',
	});


    this.electronicPaymentFormForm = this.formBuilder.group({
      
  form55Date : [this.selectedElectronicPaymentForm.form55Date],
  form55Number : [this.selectedElectronicPaymentForm.form55Number],
  areaNumber : [this.selectedElectronicPaymentForm.areaNumber],
  paidType : [this.selectedElectronicPaymentForm.paidType]
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
    return this.electronicPaymentFormForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.electronicPaymentFormForm.controls)) {
      this.electronicPaymentFormForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.paidTypesService = new LookupService('paidtypes', this.http);
  }
}

