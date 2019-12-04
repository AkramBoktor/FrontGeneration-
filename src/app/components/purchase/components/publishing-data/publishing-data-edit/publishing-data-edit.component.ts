
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PublishingData } from 'app/shared/models/publishing-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PublishingDataService } from '../shared/publishing-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-publishing-data-edit',
  templateUrl: './publishing-data-edit.component.html',
  styleUrls: ['./publishing-data-edit.component.scss'],
  providers: []
})

export class PublishingDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPublishingData: PublishingData;
  publishingDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;
private publishingAuthoritiesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
newspaperNameSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('newspaperName', { static: true }) NewspaperNameSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPublishingDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<PublishingDataEditComponent>,
    public publishingDataService: PublishingDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPublishingData = new PublishingData();
    this.selectedPublishingData = this.selectedPublishingDataDialog.data || this.selectedPublishingData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.newspaperNameSelectOptions = new MaterialSelectOptions({
	 data: this.publishingAuthoritiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسم الجريدة',
	});


    this.publishingDataForm = this.formBuilder.group({
      
  id : [this.selectedPublishingData.id],
  bidNumber : [this.selectedPublishingData.bidNumber, [ Validators.required ]],
  publicationNumber : [this.selectedPublishingData.publicationNumber, [ Validators.required ]],
  publicationDate : [this.selectedPublishingData.publicationDate, [ Validators.required ]],
  offeringType : [this.selectedPublishingData.offeringType, [ Validators.required ]],
  newspaperName : [this.selectedPublishingData.newspaperName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.publishingDataService.update(this.publishingDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.publishingDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.publishingDataForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
  }
}
