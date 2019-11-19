
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CanceledTender } from 'app/shared/models/canceled-tender';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CanceledTenderService } from '../shared/canceled-tender.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-canceled-tender-view',
  templateUrl: './canceled-tender-view.component.html',
  styleUrls: ['./canceled-tender-view.component.scss'],
  providers: []
})

export class CanceledTenderViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCanceledTender: CanceledTender;
  canceledTenderForm: FormGroup;

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCanceledTenderDialog: any,
    @Optional() public dialogRef: MatDialogRef<CanceledTenderViewComponent>,
    public canceledTenderService: CanceledTenderService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCanceledTender = this.selectedCanceledTenderDialog.data || this.selectedCanceledTender;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.canceledTenderForm = this.formBuilder.group({
      
  bidNumber : [this.selectedCanceledTender.bidNumber],
  tenderNumber : [this.selectedCanceledTender.tenderNumber],
  contractorCode : [this.selectedCanceledTender.contractorCode],
  schoolNumber : [this.selectedCanceledTender.schoolNumber],
  schoolName : [this.selectedCanceledTender.schoolName],
  exclusionReason : [this.selectedCanceledTender.exclusionReason],
  offeringType : [this.selectedCanceledTender.offeringType]
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
          
	{
	 errorName: 'min',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'min',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.canceledTenderForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.canceledTenderForm.controls)) {
      this.canceledTenderForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

