
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FormADisbursementForm } from 'app/shared/models/form-a-disbursement-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FormADisbursementFormService } from '../shared/form-a-disbursement-form.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-form-a-disbursement-form-edit',
  templateUrl: './form-a-disbursement-form-edit.component.html',
  styleUrls: ['./form-a-disbursement-form-edit.component.scss'],
  providers: []
})

export class FormADisbursementFormEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFormADisbursementForm: FormADisbursementForm;
  formADisbursementFormForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFormADisbursementFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<FormADisbursementFormEditComponent>,
    public formADisbursementFormService: FormADisbursementFormService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFormADisbursementForm = new FormADisbursementForm();
    this.selectedFormADisbursementForm = this.selectedFormADisbursementFormDialog.data || this.selectedFormADisbursementForm;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.formADisbursementFormForm = this.formBuilder.group({
      
  id : [this.selectedFormADisbursementForm.id],
  billNumber : [this.selectedFormADisbursementForm.billNumber, [ ]],
  invoicePagesNumber : [this.selectedFormADisbursementForm.invoicePagesNumber, [ ]],
  invoiceDate : [this.selectedFormADisbursementForm.invoiceDate, [ ]],
  bidNumber : [this.selectedFormADisbursementForm.bidNumber, [ ]],
  companyName : [this.selectedFormADisbursementForm.companyName, [ ]],
  offeringType : [this.selectedFormADisbursementForm.offeringType, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.formADisbursementFormService.update(this.formADisbursementFormForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.formADisbursementFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.formADisbursementFormForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
