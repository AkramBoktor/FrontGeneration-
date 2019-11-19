
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RespondToVisa } from 'app/shared/models/respond-to-visa';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { RespondToVisaService } from '../shared/respond-to-visa.service';




@Component({
  selector: 'app-respond-to-visa-edit',
  templateUrl: './respond-to-visa-edit.component.html',
  styleUrls: ['./respond-to-visa-edit.component.scss'],
  providers: []
})

export class RespondToVisaEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRespondToVisa: RespondToVisa;
  respondToVisaForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;
private entityTypeService: LookupService;
private replyTypesService: LookupService;
private subDepartmentsService: LookupService;
private applicationsTypesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;
entityTypeCodeSelectOptions: MaterialSelectOptions;
replyCodeSelectOptions: MaterialSelectOptions;
entityReplyCodeSelectOptions: MaterialSelectOptions;
orderTypeCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationCodePlace', { static: true }) PublicationCodePlaceSelectComponent: MaterialSelectComponent;
	@ViewChild('entityTypeCode', { static: true }) EntityTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('replyCode', { static: true }) ReplyCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityReplyCode', { static: true }) EntityReplyCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('orderTypeCode', { static: true }) OrderTypeCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRespondToVisaDialog: any,
    @Optional() public dialogRef: MatDialogRef<RespondToVisaEditComponent>,
    public respondToVisaService: RespondToVisaService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRespondToVisa = new RespondToVisa();
    this.selectedRespondToVisa = this.selectedRespondToVisaDialog.data || this.selectedRespondToVisa;

    
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

	this.entityTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع الجهة',
	});

	this.replyCodeSelectOptions = new MaterialSelectOptions({
	 data: this.replyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الرد',
	});

	this.entityReplyCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة القائمة بالرد',
	});

	this.orderTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.applicationsTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع الطلب',
	});


    this.respondToVisaForm = this.formBuilder.group({
      
  id : [this.selectedRespondToVisa.id],
  publicationDate : [this.selectedRespondToVisa.publicationDate, [ ]],
  replyDate : [this.selectedRespondToVisa.replyDate, [ Validators.required ]],
  replierCode : [this.selectedRespondToVisa.replierCode, [ Validators.required ]],
  hasAttachments : [this.selectedRespondToVisa.hasAttachments, [ Validators.required ]],
  serial : [this.selectedRespondToVisa.serial, [ Validators.required ]],
  replyText : [this.selectedRespondToVisa.replyText, [ Validators.required ]],
  publisherCode : [this.selectedRespondToVisa.publisherCode, [ Validators.required ]],
  publicationCodePlace : [this.selectedRespondToVisa.publicationCodePlace, [ ]],
  entityTypeCode : [this.selectedRespondToVisa.entityTypeCode, [ Validators.required ]],
  replyCode : [this.selectedRespondToVisa.replyCode, [ Validators.required ]],
  entityReplyCode : [this.selectedRespondToVisa.entityReplyCode, [ Validators.required ]],
  orderTypeCode : [this.selectedRespondToVisa.orderTypeCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.respondToVisaService.update(this.respondToVisaForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.respondToVisaService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.respondToVisaForm.get(name);
  }

  initializeLookupServices() {
    this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
this.publishingPlacesService = new LookupService('publishingplaces', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.replyTypesService = new LookupService('replytypes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.applicationsTypesService = new LookupService('applicationstypes', this.http);
  }
}
