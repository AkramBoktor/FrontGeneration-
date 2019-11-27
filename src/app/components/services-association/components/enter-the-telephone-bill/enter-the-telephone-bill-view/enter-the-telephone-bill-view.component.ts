
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EnterTheTelephoneBill } from 'app/shared/models/enter-the-telephone-bill';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EnterTheTelephoneBillService } from '../shared/enter-the-telephone-bill.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-enter-the-telephone-bill-view',
  templateUrl: './enter-the-telephone-bill-view.component.html',
  styleUrls: ['./enter-the-telephone-bill-view.component.scss'],
  providers: []
})

export class EnterTheTelephoneBillViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEnterTheTelephoneBill: EnterTheTelephoneBill;
  enterTheTelephoneBillForm: FormGroup;

  private departmentsSectionsService: LookupService;

  
admistrationCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEnterTheTelephoneBillDialog: any,
    @Optional() public dialogRef: MatDialogRef<EnterTheTelephoneBillViewComponent>,
    public enterTheTelephoneBillService: EnterTheTelephoneBillService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnterTheTelephoneBill = this.selectedEnterTheTelephoneBillDialog.data || this.selectedEnterTheTelephoneBill;

    
	this.admistrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الادارة',
	});


    this.enterTheTelephoneBillForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEnterTheTelephoneBill.employeeCode],
  phoneNumber : [this.selectedEnterTheTelephoneBill.phoneNumber],
  admistrationCode : [this.selectedEnterTheTelephoneBill.admistrationCode]
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
    return this.enterTheTelephoneBillForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.enterTheTelephoneBillForm.controls)) {
      this.enterTheTelephoneBillForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}

