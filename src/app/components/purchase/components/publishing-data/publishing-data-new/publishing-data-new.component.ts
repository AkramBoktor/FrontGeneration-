
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PublishingData } from 'app/shared/models/publishing-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PublishingDataService } from '../shared/publishing-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-publishing-data-new',
  templateUrl: './publishing-data-new.component.html',
  styleUrls: ['./publishing-data-new.component.scss'],
  providers: [
    ]
})

export class PublishingDataNewComponent extends AppBaseComponent implements OnInit {
  publishingDataForm: FormGroup;
  @Input() selectedPublishingData: PublishingData;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PublishingDataNewComponent>,
    public publishingDataService: PublishingDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPublishingData = new PublishingData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.publishingDataForm = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedPublishingData.bidNumber, [ Validators.required ]],
  publicationNumber : [this.selectedPublishingData.publicationNumber, [ Validators.required ]],
  publicationDate : [this.selectedPublishingData.publicationDate, [ Validators.required ]],
  newspaperName : [this.selectedPublishingData.newspaperName, [ Validators.required ]],
  offeringType : [this.selectedPublishingData.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.publishingDataService.create(this.publishingDataForm.value)
        .pipe(switchMap(x => {
			return this.publishingDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.publishingDataForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
