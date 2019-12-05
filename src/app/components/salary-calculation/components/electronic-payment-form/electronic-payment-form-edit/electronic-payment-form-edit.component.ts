
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ElectronicPaymentForm } from 'app/shared/models/electronic-payment-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ElectronicPaymentFormService } from '../shared/electronic-payment-form.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-electronic-payment-form-edit',
  templateUrl: './electronic-payment-form-edit.component.html',
  styleUrls: ['./electronic-payment-form-edit.component.scss'],
  providers: []
})

export class ElectronicPaymentFormEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedElectronicPaymentForm: ElectronicPaymentForm;
  electronicPaymentFormForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private areasService: LookupService;
private paidTypesService: LookupService;

  
areaNumberSelectOptions: MaterialSelectOptions;
paidTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('areaNumber', { static: true }) AreaNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('paidType', { static: true }) PaidTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedElectronicPaymentFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<ElectronicPaymentFormEditComponent>,
    public electronicPaymentFormService: ElectronicPaymentFormService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElectronicPaymentForm = new ElectronicPaymentForm();
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
      
  id : [this.selectedElectronicPaymentForm.id],
  form55Date : [this.selectedElectronicPaymentForm.form55Date, [ Validators.required ]],
  form55Number : [this.selectedElectronicPaymentForm.form55Number, [ Validators.required ]],
  areaNumber : [this.selectedElectronicPaymentForm.areaNumber, [ Validators.required ]],
  paidType : [this.selectedElectronicPaymentForm.paidType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.electronicPaymentFormService.update(this.electronicPaymentFormForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.electronicPaymentFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.electronicPaymentFormForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.paidTypesService = new LookupService('paidtypes', this.http);
  }
}
