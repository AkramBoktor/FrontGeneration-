
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BasicDataLogging } from 'app/shared/models/basic-data-logging';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { BasicDataLoggingService } from '../shared/basic-data-logging.service';




@Component({
  selector: 'app-basic-data-logging-edit',
  templateUrl: './basic-data-logging-edit.component.html',
  styleUrls: ['./basic-data-logging-edit.component.scss'],
  providers: []
})

export class BasicDataLoggingEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBasicDataLogging: BasicDataLogging;
  basicDataLoggingForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;

  
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationCodePlace', { static: true }) PublicationCodePlaceSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBasicDataLoggingDialog: any,
    @Optional() public dialogRef: MatDialogRef<BasicDataLoggingEditComponent>,
    public basicDataLoggingService: BasicDataLoggingService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicDataLogging = new BasicDataLogging();
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
      
  id : [this.selectedBasicDataLogging.id],
  publicationDate : [this.selectedBasicDataLogging.publicationDate, [ Validators.required ]],
  pageNumber : [this.selectedBasicDataLogging.pageNumber, [ Validators.required ]],
  authorName : [this.selectedBasicDataLogging.authorName, [ Validators.required ]],
  number : [this.selectedBasicDataLogging.number, [ Validators.required ]],
  publisherCode : [this.selectedBasicDataLogging.publisherCode, [ Validators.required ]],
  publicationCodePlace : [this.selectedBasicDataLogging.publicationCodePlace, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.basicDataLoggingService.update(this.basicDataLoggingForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.basicDataLoggingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.basicDataLoggingForm.get(name);
  }

  initializeLookupServices() {
    this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
this.publishingPlacesService = new LookupService('publishingplaces', this.http);
  }
}
