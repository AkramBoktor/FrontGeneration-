
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InstallationRecord } from 'app/shared/models/installation-record';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { InstallationRecordService } from '../shared/installation-record.service';




@Component({
  selector: 'app-installation-record-edit',
  templateUrl: './installation-record-edit.component.html',
  styleUrls: ['./installation-record-edit.component.scss'],
  providers: []
})

export class InstallationRecordEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInstallationRecord: InstallationRecord;
  installationRecordForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInstallationRecordDialog: any,
    @Optional() public dialogRef: MatDialogRef<InstallationRecordEditComponent>,
    public installationRecordService: InstallationRecordService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInstallationRecord = new InstallationRecord();
    this.selectedInstallationRecord = this.selectedInstallationRecordDialog.data || this.selectedInstallationRecord;

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف',
	});


    this.installationRecordForm = this.formBuilder.group({
      
  id : [this.selectedInstallationRecord.id],
  employeeCode : [this.selectedInstallationRecord.employeeCode, [ Validators.required ]],
  itemNo : [this.selectedInstallationRecord.itemNo, [ Validators.required ]],
  storeNumber : [this.selectedInstallationRecord.storeNumber, [ ]],
  exchangeAuthorizationNumber : [this.selectedInstallationRecord.exchangeAuthorizationNumber, [ ]],
  exchangeDate : [this.selectedInstallationRecord.exchangeDate, [ ]],
  quantityExchange : [this.selectedInstallationRecord.quantityExchange, [ ]],
  recordDate : [this.selectedInstallationRecord.recordDate, [ Validators.required ]],
  recordNumber : [this.selectedInstallationRecord.recordNumber, [ Validators.required ]],
  installationPlace : [this.selectedInstallationRecord.installationPlace, [ Validators.required ]],
  itemCondition : [this.selectedInstallationRecord.itemCondition, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.installationRecordService.update(this.installationRecordForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.installationRecordService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.installationRecordForm.get(name);
  }

  initializeLookupServices() {
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}
