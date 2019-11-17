
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FollowupRequestToNewAgency } from 'app/shared/models/followup-request-to-new-agency';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { FollowupRequestToNewAgencyService } from '../shared/followup-request-to-new-agency.service';




@Component({
  selector: 'app-followup-request-to-new-agency-edit',
  templateUrl: './followup-request-to-new-agency-edit.component.html',
  styleUrls: ['./followup-request-to-new-agency-edit.component.scss'],
  providers: []
})

export class FollowupRequestToNewAgencyEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFollowupRequestToNewAgency: FollowupRequestToNewAgency;
  followupRequestToNewAgencyForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;
private subDepartmentsService: LookupService;
private applicationsTypesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;
specificEntityCodeSelectOptions: MaterialSelectOptions;
requestTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationCodePlace', { static: true }) PublicationCodePlaceSelectComponent: MaterialSelectComponent;
	@ViewChild('specificEntityCode', { static: true }) SpecificEntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('requestType', { static: true }) RequestTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFollowupRequestToNewAgencyDialog: any,
    @Optional() public dialogRef: MatDialogRef<FollowupRequestToNewAgencyEditComponent>,
    public followupRequestToNewAgencyService: FollowupRequestToNewAgencyService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowupRequestToNewAgency = new FollowupRequestToNewAgency();
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
      
  id : [this.selectedFollowupRequestToNewAgency.id],
  publicationDate : [this.selectedFollowupRequestToNewAgency.publicationDate, [ ]],
  pageNumber : [this.selectedFollowupRequestToNewAgency.pageNumber, [ Validators.required ]],
  presentationDate : [this.selectedFollowupRequestToNewAgency.presentationDate, [ ]],
  visaDate : [this.selectedFollowupRequestToNewAgency.visaDate, [ Validators.required ]],
  newsFollowersNo : [this.selectedFollowupRequestToNewAgency.newsFollowersNo, [ Validators.required ]],
  publisherCode : [this.selectedFollowupRequestToNewAgency.publisherCode, [ Validators.required ]],
  publicationCodePlace : [this.selectedFollowupRequestToNewAgency.publicationCodePlace, [ Validators.required ]],
  specificEntityCode : [this.selectedFollowupRequestToNewAgency.specificEntityCode, [ Validators.required ]],
  requestType : [this.selectedFollowupRequestToNewAgency.requestType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.followupRequestToNewAgencyService.update(this.followupRequestToNewAgencyForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.followupRequestToNewAgencyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.followupRequestToNewAgencyForm.get(name);
  }

  initializeLookupServices() {
    this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
this.publishingPlacesService = new LookupService('publishingplaces', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.applicationsTypesService = new LookupService('applicationstypes', this.http);
  }
}
