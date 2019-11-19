
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PublishingData } from 'app/shared/models/publishing-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PublishingDataService } from '../shared/publishing-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-publishing-data-view',
  templateUrl: './publishing-data-view.component.html',
  styleUrls: ['./publishing-data-view.component.scss'],
  providers: []
})

export class PublishingDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPublishingData: PublishingData;
  publishingDataForm: FormGroup;

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPublishingDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<PublishingDataViewComponent>,
    public publishingDataService: PublishingDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPublishingData = this.selectedPublishingDataDialog.data || this.selectedPublishingData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.publishingDataForm = this.formBuilder.group({
      
  bidNumber : [this.selectedPublishingData.bidNumber],
  publicationNumber : [this.selectedPublishingData.publicationNumber],
  publicationDate : [this.selectedPublishingData.publicationDate],
  newspaperName : [this.selectedPublishingData.newspaperName],
  offeringType : [this.selectedPublishingData.offeringType]
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
    return this.publishingDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.publishingDataForm.controls)) {
      this.publishingDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

