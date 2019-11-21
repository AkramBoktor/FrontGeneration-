
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IntroducingSocialGrantsToParticipantsOfAssociation } from 'app/shared/models/introducing-social-grants-to-participants-of-association';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { IntroducingSocialGrantsToParticipantsOfAssociationService } from '../shared/introducing-social-grants-to-participants-of-association.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-introducing-social-grants-to-participants-of-association-edit',
  templateUrl: './introducing-social-grants-to-participants-of-association-edit.component.html',
  styleUrls: ['./introducing-social-grants-to-participants-of-association-edit.component.scss'],
  providers: []
})

export class IntroducingSocialGrantsToParticipantsOfAssociationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIntroducingSocialGrantsToParticipantsOfAssociation: IntroducingSocialGrantsToParticipantsOfAssociation;
  introducingSocialGrantsToParticipantsOfAssociationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private statusCodesService: LookupService;

  
caseSelectOptions: MaterialSelectOptions;

  
	@ViewChild('case', { static: true }) CaseSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIntroducingSocialGrantsToParticipantsOfAssociationDialog: any,
    @Optional() public dialogRef: MatDialogRef<IntroducingSocialGrantsToParticipantsOfAssociationEditComponent>,
    public introducingSocialGrantsToParticipantsOfAssociationService: IntroducingSocialGrantsToParticipantsOfAssociationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIntroducingSocialGrantsToParticipantsOfAssociation = new IntroducingSocialGrantsToParticipantsOfAssociation();
    this.selectedIntroducingSocialGrantsToParticipantsOfAssociation = this.selectedIntroducingSocialGrantsToParticipantsOfAssociationDialog.data || this.selectedIntroducingSocialGrantsToParticipantsOfAssociation;

    
	this.caseSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الحالة',
	});


    this.introducingSocialGrantsToParticipantsOfAssociationForm = this.formBuilder.group({
      
  id : [this.selectedIntroducingSocialGrantsToParticipantsOfAssociation.id],
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
    this.introducingSocialGrantsToParticipantsOfAssociationService.update(this.introducingSocialGrantsToParticipantsOfAssociationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.introducingSocialGrantsToParticipantsOfAssociationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.introducingSocialGrantsToParticipantsOfAssociationForm.get(name);
  }

  initializeLookupServices() {
    this.statusCodesService = new LookupService('statuscodes', this.http);
  }
}
