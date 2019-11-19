
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InstallationRecord } from 'app/shared/models/installation-record';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { InstallationRecordService } from '../shared/installation-record.service';


@Component({
  selector: 'app-installation-record-new',
  templateUrl: './installation-record-new.component.html',
  styleUrls: ['./installation-record-new.component.scss'],
  providers: [
    ]
})

export class InstallationRecordNewComponent extends AppBaseComponent implements OnInit {
  installationRecordForm: FormGroup;
  @Input() selectedInstallationRecord: InstallationRecord;
  errorMessages: FormControlError[] = [
        
  ];

  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<InstallationRecordNewComponent>,
    public installationRecordService: InstallationRecordService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInstallationRecord = new InstallationRecord();

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف',
	});


    this.installationRecordForm = this.formBuilder.group({
     
  id : [0],
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
    this.installationRecordService.create(this.installationRecordForm.value)
        .pipe(switchMap(x => {
			return this.installationRecordService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.installationRecordForm.get(name);
    }

  initializeLookupServices() {
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
 }
