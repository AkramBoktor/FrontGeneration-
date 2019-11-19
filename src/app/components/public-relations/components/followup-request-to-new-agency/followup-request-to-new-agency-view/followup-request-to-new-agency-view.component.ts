
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FollowupRequestToNewAgency } from 'app/shared/models/followup-request-to-new-agency';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FollowupRequestToNewAgencyService } from '../shared/followup-request-to-new-agency.service';

@Component({
  selector: 'app-followup-request-to-new-agency-view',
  templateUrl: './followup-request-to-new-agency-view.component.html',
  styleUrls: ['./followup-request-to-new-agency-view.component.scss'],
  providers: []
})

export class FollowupRequestToNewAgencyViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFollowupRequestToNewAgency: FollowupRequestToNewAgency;
  followupRequestToNewAgencyForm: FormGroup;

  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;
private subDepartmentsService: LookupService;
private applicationsTypesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;
specificEntityCodeSelectOptions: MaterialSelectOptions;
requestTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFollowupRequestToNewAgencyDialog: any,
    @Optional() public dialogRef: MatDialogRef<FollowupRequestToNewAgencyViewComponent>,
    public followupRequestToNewAgencyService: FollowupRequestToNewAgencyService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowupRequestToNewAgency = this.selectedFollowupRequestToNewAgencyDialog.data || this.selectedFollowupRequestToNewAgency;

    
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

	this.specificEntityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة المعنية',
	});

	this.requestTypeSelectOptions = new MaterialSelectOptions({
	 data: this.applicationsTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطلب',
	});


    this.followupRequestToNewAgencyForm = this.formBuilder.group({
      
  publicationDate : [this.selectedFollowupRequestToNewAgency.publicationDate],
  pageNumber : [this.selectedFollowupRequestToNewAgency.pageNumber],
  presentationDate : [this.selectedFollowupRequestToNewAgency.presentationDate],
  visaDate : [this.selectedFollowupRequestToNewAgency.visaDate],
  newsFollowersNo : [this.selectedFollowupRequestToNewAgency.newsFollowersNo],
  publisherCode : [this.selectedFollowupRequestToNewAgency.publisherCode],
  publicationCodePlace : [this.selectedFollowupRequestToNewAgency.publicationCodePlace],
  specificEntityCode : [this.selectedFollowupRequestToNewAgency.specificEntityCode],
  requestType : [this.selectedFollowupRequestToNewAgency.requestType]
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
    return this.followupRequestToNewAgencyForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.followupRequestToNewAgencyForm.controls)) {
      this.followupRequestToNewAgencyForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
this.publishingPlacesService = new LookupService('publishingplaces', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.applicationsTypesService = new LookupService('applicationstypes', this.http);
  }
}

