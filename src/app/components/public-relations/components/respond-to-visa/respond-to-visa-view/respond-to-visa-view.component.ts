
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RespondToVisa } from 'app/shared/models/respond-to-visa';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RespondToVisaService } from '../shared/respond-to-visa.service';

@Component({
  selector: 'app-respond-to-visa-view',
  templateUrl: './respond-to-visa-view.component.html',
  styleUrls: ['./respond-to-visa-view.component.scss'],
  providers: []
})

export class RespondToVisaViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRespondToVisa: RespondToVisa;
  respondToVisaForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRespondToVisaDialog: any,
    @Optional() public dialogRef: MatDialogRef<RespondToVisaViewComponent>,
    public respondToVisaService: RespondToVisaService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  publicationDate : [this.selectedRespondToVisa.publicationDate],
  replyDate : [this.selectedRespondToVisa.replyDate],
  replierCode : [this.selectedRespondToVisa.replierCode],
  hasAttachments : [this.selectedRespondToVisa.hasAttachments],
  serial : [this.selectedRespondToVisa.serial],
  replyText : [this.selectedRespondToVisa.replyText],
  publisherCode : [this.selectedRespondToVisa.publisherCode],
  publicationCodePlace : [this.selectedRespondToVisa.publicationCodePlace],
  entityTypeCode : [this.selectedRespondToVisa.entityTypeCode],
  replyCode : [this.selectedRespondToVisa.replyCode],
  entityReplyCode : [this.selectedRespondToVisa.entityReplyCode],
  orderTypeCode : [this.selectedRespondToVisa.orderTypeCode]
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
    return this.respondToVisaForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.respondToVisaForm.controls)) {
      this.respondToVisaForm.controls[control].disable();
    }
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

