
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BasicDataLogging } from 'app/shared/models/basic-data-logging';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BasicDataLoggingService } from '../shared/basic-data-logging.service';

@Component({
  selector: 'app-basic-data-logging-view',
  templateUrl: './basic-data-logging-view.component.html',
  styleUrls: ['./basic-data-logging-view.component.scss'],
  providers: []
})

export class BasicDataLoggingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBasicDataLogging: BasicDataLogging;
  basicDataLoggingForm: FormGroup;

  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBasicDataLoggingDialog: any,
    @Optional() public dialogRef: MatDialogRef<BasicDataLoggingViewComponent>,
    public basicDataLoggingService: BasicDataLoggingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicDataLogging = this.selectedBasicDataLoggingDialog.data || this.selectedBasicDataLogging;

    
	this.publisherCodeSelectOptions = new MaterialSelectOptions({
	 data: this.publishingAuthoritiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهة النشر',
	});

	this.publicationCodePlaceSelectOptions = new MaterialSelectOptions({
	 data: this.publishingPlacesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مكان النشر',
	});


    this.basicDataLoggingForm = this.formBuilder.group({
      
  publicationDate : [this.selectedBasicDataLogging.publicationDate],
  pageNumber : [this.selectedBasicDataLogging.pageNumber],
  authorName : [this.selectedBasicDataLogging.authorName],
  number : [this.selectedBasicDataLogging.number],
  series : [this.selectedBasicDataLogging.series],
  newsTitle : [this.selectedBasicDataLogging.newsTitle],
  publisherCode : [this.selectedBasicDataLogging.publisherCode],
  publicationCodePlace : [this.selectedBasicDataLogging.publicationCodePlace]
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
    return this.basicDataLoggingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.basicDataLoggingForm.controls)) {
      this.basicDataLoggingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
this.publishingPlacesService = new LookupService('publishingplaces', this.http);
  }
}

