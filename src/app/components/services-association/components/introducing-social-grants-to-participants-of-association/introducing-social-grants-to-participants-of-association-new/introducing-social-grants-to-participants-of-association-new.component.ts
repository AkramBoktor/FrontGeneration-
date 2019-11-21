
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { IntroducingSocialGrantsToParticipantsOfAssociation } from 'app/shared/models/introducing-social-grants-to-participants-of-association';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IntroducingSocialGrantsToParticipantsOfAssociationService } from '../shared/introducing-social-grants-to-participants-of-association.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-introducing-social-grants-to-participants-of-association-new',
  templateUrl: './introducing-social-grants-to-participants-of-association-new.component.html',
  styleUrls: ['./introducing-social-grants-to-participants-of-association-new.component.scss'],
  providers: [
    ]
})

export class IntroducingSocialGrantsToParticipantsOfAssociationNewComponent extends AppBaseComponent implements OnInit {
  introducingSocialGrantsToParticipantsOfAssociationForm: FormGroup;
  @Input() selectedIntroducingSocialGrantsToParticipantsOfAssociation: IntroducingSocialGrantsToParticipantsOfAssociation;
  errorMessages: FormControlError[] = [
        
  ];

  private statusCodesService: LookupService;

  
caseSelectOptions: MaterialSelectOptions;

  
	@ViewChild('case', { static: true }) CaseSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<IntroducingSocialGrantsToParticipantsOfAssociationNewComponent>,
    public introducingSocialGrantsToParticipantsOfAssociationService: IntroducingSocialGrantsToParticipantsOfAssociationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIntroducingSocialGrantsToParticipantsOfAssociation = new IntroducingSocialGrantsToParticipantsOfAssociation();

    
	this.caseSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الحالة',
	});


    this.introducingSocialGrantsToParticipantsOfAssociationForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedIntroducingSocialGrantsToParticipantsOfAssociation.employeeCode, [ Validators.required ]],
  membershipNo : [this.selectedIntroducingSocialGrantsToParticipantsOfAssociation.membershipNo, [ Validators.required ]],
  exchangeDate : [this.selectedIntroducingSocialGrantsToParticipantsOfAssociation.exchangeDate, [ Validators.required ]],
  exchangeValue : [this.selectedIntroducingSocialGrantsToParticipantsOfAssociation.exchangeValue, [ Validators.required ]],
  deceasedName : [this.selectedIntroducingSocialGrantsToParticipantsOfAssociation.deceasedName, [ Validators.required ]],
  case : [this.selectedIntroducingSocialGrantsToParticipantsOfAssociation.case, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.introducingSocialGrantsToParticipantsOfAssociationService.create(this.introducingSocialGrantsToParticipantsOfAssociationForm.value)
        .pipe(switchMap(x => {
			return this.introducingSocialGrantsToParticipantsOfAssociationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.introducingSocialGrantsToParticipantsOfAssociationForm.get(name);
    }

  initializeLookupServices() {
    this.statusCodesService = new LookupService('statuscodes', this.http);
  }
 }
