
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AuthorityResponseToNewspaper } from 'app/shared/models/authority-response-to-newspaper';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AuthorityResponseToNewspaperService } from '../shared/authority-response-to-newspaper.service';




@Component({
  selector: 'app-authority-response-to-newspaper-edit',
  templateUrl: './authority-response-to-newspaper-edit.component.html',
  styleUrls: ['./authority-response-to-newspaper-edit.component.scss'],
  providers: []
})

export class AuthorityResponseToNewspaperEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAuthorityResponseToNewspaper: AuthorityResponseToNewspaper;
  authorityResponseToNewspaperForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;

  
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationCodePlace', { static: true }) PublicationCodePlaceSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAuthorityResponseToNewspaperDialog: any,
    @Optional() public dialogRef: MatDialogRef<AuthorityResponseToNewspaperEditComponent>,
    public authorityResponseToNewspaperService: AuthorityResponseToNewspaperService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAuthorityResponseToNewspaper = new AuthorityResponseToNewspaper();
    this.selectedAuthorityResponseToNewspaper = this.selectedAuthorityResponseToNewspaperDialog.data || this.selectedAuthorityResponseToNewspaper;

    
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


    this.authorityResponseToNewspaperForm = this.formBuilder.group({
      
  id : [this.selectedAuthorityResponseToNewspaper.id],
  publicationDate : [this.selectedAuthorityResponseToNewspaper.publicationDate, [ Validators.required ]],
  pageNumber : [this.selectedAuthorityResponseToNewspaper.pageNumber, [ Validators.required ]],
  newsTitle : [this.selectedAuthorityResponseToNewspaper.newsTitle, [ Validators.required ]],
  authorityrReplyDate : [this.selectedAuthorityResponseToNewspaper.authorityrReplyDate, [ ]],
  publisherCode : [this.selectedAuthorityResponseToNewspaper.publisherCode, [ Validators.required ]],
  publicationCodePlace : [this.selectedAuthorityResponseToNewspaper.publicationCodePlace, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.authorityResponseToNewspaperService.update(this.authorityResponseToNewspaperForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.authorityResponseToNewspaperService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.authorityResponseToNewspaperForm.get(name);
  }

  initializeLookupServices() {
    this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
this.publishingPlacesService = new LookupService('publishingplaces', this.http);
  }
}
