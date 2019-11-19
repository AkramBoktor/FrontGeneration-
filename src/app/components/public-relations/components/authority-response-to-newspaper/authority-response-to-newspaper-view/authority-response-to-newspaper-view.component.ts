
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AuthorityResponseToNewspaper } from 'app/shared/models/authority-response-to-newspaper';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AuthorityResponseToNewspaperService } from '../shared/authority-response-to-newspaper.service';

@Component({
  selector: 'app-authority-response-to-newspaper-view',
  templateUrl: './authority-response-to-newspaper-view.component.html',
  styleUrls: ['./authority-response-to-newspaper-view.component.scss'],
  providers: []
})

export class AuthorityResponseToNewspaperViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAuthorityResponseToNewspaper: AuthorityResponseToNewspaper;
  authorityResponseToNewspaperForm: FormGroup;

  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAuthorityResponseToNewspaperDialog: any,
    @Optional() public dialogRef: MatDialogRef<AuthorityResponseToNewspaperViewComponent>,
    public authorityResponseToNewspaperService: AuthorityResponseToNewspaperService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  publicationDate : [this.selectedAuthorityResponseToNewspaper.publicationDate],
  pageNumber : [this.selectedAuthorityResponseToNewspaper.pageNumber],
  newsTitle : [this.selectedAuthorityResponseToNewspaper.newsTitle],
  authorityrReplyDate : [this.selectedAuthorityResponseToNewspaper.authorityrReplyDate],
  publisherCode : [this.selectedAuthorityResponseToNewspaper.publisherCode],
  publicationCodePlace : [this.selectedAuthorityResponseToNewspaper.publicationCodePlace]
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
    return this.authorityResponseToNewspaperForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.authorityResponseToNewspaperForm.controls)) {
      this.authorityResponseToNewspaperForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
this.publishingPlacesService = new LookupService('publishingplaces', this.http);
  }
}

