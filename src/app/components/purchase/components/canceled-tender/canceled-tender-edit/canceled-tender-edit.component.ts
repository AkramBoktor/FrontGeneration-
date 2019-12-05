
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CanceledTender } from 'app/shared/models/canceled-tender';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CanceledTenderService } from '../shared/canceled-tender.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-canceled-tender-edit',
  templateUrl: './canceled-tender-edit.component.html',
  styleUrls: ['./canceled-tender-edit.component.scss'],
  providers: []
})

export class CanceledTenderEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCanceledTender: CanceledTender;
  canceledTenderForm: FormGroup;
  errorMessages: FormControlError[] = [
          
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCanceledTenderDialog: any,
    @Optional() public dialogRef: MatDialogRef<CanceledTenderEditComponent>,
    public canceledTenderService: CanceledTenderService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCanceledTender = new CanceledTender();
    this.selectedCanceledTender = this.selectedCanceledTenderDialog.data || this.selectedCanceledTender;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.canceledTenderForm = this.formBuilder.group({
      
  id : [this.selectedCanceledTender.id],
  bidNumber : [this.selectedCanceledTender.bidNumber, [ Validators.required,Validators.minLength(1) ]],
  tenderNumber : [this.selectedCanceledTender.tenderNumber, [ Validators.required,Validators.minLength(1) ]],
  contractorCode : [this.selectedCanceledTender.contractorCode, [ ]],
  schoolNumber : [this.selectedCanceledTender.schoolNumber, [ Validators.required,Validators.minLength(1) ]],
  schoolName : [this.selectedCanceledTender.schoolName, [ ]],
  exclusionReason : [this.selectedCanceledTender.exclusionReason, [ Validators.required ]],
  offeringType : [this.selectedCanceledTender.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.canceledTenderService.update(this.canceledTenderForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.canceledTenderService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.canceledTenderForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
