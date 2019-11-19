
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EnvelopesOpennigCommetyMembersData } from 'app/shared/models/envelopes-opennig-commety-members-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EnvelopesOpennigCommetyMembersDataService } from '../shared/envelopes-opennig-commety-members-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-envelopes-opennig-commety-members-data-edit',
  templateUrl: './envelopes-opennig-commety-members-data-edit.component.html',
  styleUrls: ['./envelopes-opennig-commety-members-data-edit.component.scss'],
  providers: []
})

export class EnvelopesOpennigCommetyMembersDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEnvelopesOpennigCommetyMembersData: EnvelopesOpennigCommetyMembersData;
  envelopesOpennigCommetyMembersDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;
private membersService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
memberTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('memberType', { static: true }) MemberTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEnvelopesOpennigCommetyMembersDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EnvelopesOpennigCommetyMembersDataEditComponent>,
    public envelopesOpennigCommetyMembersDataService: EnvelopesOpennigCommetyMembersDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnvelopesOpennigCommetyMembersData = new EnvelopesOpennigCommetyMembersData();
    this.selectedEnvelopesOpennigCommetyMembersData = this.selectedEnvelopesOpennigCommetyMembersDataDialog.data || this.selectedEnvelopesOpennigCommetyMembersData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.memberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.membersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العضو',
	});


    this.envelopesOpennigCommetyMembersDataForm = this.formBuilder.group({
      
  id : [this.selectedEnvelopesOpennigCommetyMembersData.id],
  bidNumber : [this.selectedEnvelopesOpennigCommetyMembersData.bidNumber, [ Validators.required ]],
  serialMember : [this.selectedEnvelopesOpennigCommetyMembersData.serialMember, [ Validators.required ]],
  memberName : [this.selectedEnvelopesOpennigCommetyMembersData.memberName, [ Validators.required ]],
  offeringType : [this.selectedEnvelopesOpennigCommetyMembersData.offeringType, [ Validators.required ]],
  memberType : [this.selectedEnvelopesOpennigCommetyMembersData.memberType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.envelopesOpennigCommetyMembersDataService.update(this.envelopesOpennigCommetyMembersDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.envelopesOpennigCommetyMembersDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.envelopesOpennigCommetyMembersDataForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.membersService = new LookupService('members', this.http);
  }
}
