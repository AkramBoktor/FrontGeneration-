
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TypicalFormADisbursementForm } from 'app/shared/models/typical-form-a-disbursement-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TypicalFormADisbursementFormService } from '../shared/typical-form-a-disbursement-form.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-form-a-disbursement-form-edit',
  templateUrl: './typical-form-a-disbursement-form-edit.component.html',
  styleUrls: ['./typical-form-a-disbursement-form-edit.component.scss'],
  providers: []
})

export class TypicalFormADisbursementFormEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalFormADisbursementForm: TypicalFormADisbursementForm;
  typicalFormADisbursementFormForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalFormADisbursementFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalFormADisbursementFormEditComponent>,
    public typicalFormADisbursementFormService: TypicalFormADisbursementFormService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalFormADisbursementForm = new TypicalFormADisbursementForm();
    this.selectedTypicalFormADisbursementForm = this.selectedTypicalFormADisbursementFormDialog.data || this.selectedTypicalFormADisbursementForm;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.typicalFormADisbursementFormForm = this.formBuilder.group({
      
  id : [this.selectedTypicalFormADisbursementForm.id],
  invoicePagesNumber : [this.selectedTypicalFormADisbursementForm.invoicePagesNumber, [ ]],
  billNumber : [this.selectedTypicalFormADisbursementForm.billNumber, [ ]],
  invoiceDate : [this.selectedTypicalFormADisbursementForm.invoiceDate, [ ]],
  bidNumber : [this.selectedTypicalFormADisbursementForm.bidNumber, [ ]],
  companyName : [this.selectedTypicalFormADisbursementForm.companyName, [ ]],
  offeringType : [this.selectedTypicalFormADisbursementForm.offeringType, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.typicalFormADisbursementFormService.update(this.typicalFormADisbursementFormForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.typicalFormADisbursementFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.typicalFormADisbursementFormForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
