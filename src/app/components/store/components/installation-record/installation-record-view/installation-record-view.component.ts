
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InstallationRecord } from 'app/shared/models/installation-record';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InstallationRecordService } from '../shared/installation-record.service';

@Component({
  selector: 'app-installation-record-view',
  templateUrl: './installation-record-view.component.html',
  styleUrls: ['./installation-record-view.component.scss'],
  providers: []
})

export class InstallationRecordViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInstallationRecord: InstallationRecord;
  installationRecordForm: FormGroup;

  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInstallationRecordDialog: any,
    @Optional() public dialogRef: MatDialogRef<InstallationRecordViewComponent>,
    public installationRecordService: InstallationRecordService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInstallationRecord = this.selectedInstallationRecordDialog.data || this.selectedInstallationRecord;

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف',
	});


    this.installationRecordForm = this.formBuilder.group({
      
  employeeCode : [this.selectedInstallationRecord.employeeCode],
  itemNo : [this.selectedInstallationRecord.itemNo],
  storeNumber : [this.selectedInstallationRecord.storeNumber],
  exchangeAuthorizationNumber : [this.selectedInstallationRecord.exchangeAuthorizationNumber],
  exchangeDate : [this.selectedInstallationRecord.exchangeDate],
  quantityExchange : [this.selectedInstallationRecord.quantityExchange],
  recordDate : [this.selectedInstallationRecord.recordDate],
  recordNumber : [this.selectedInstallationRecord.recordNumber],
  installationPlace : [this.selectedInstallationRecord.installationPlace],
  itemCondition : [this.selectedInstallationRecord.itemCondition]
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
    return this.installationRecordForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.installationRecordForm.controls)) {
      this.installationRecordForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

