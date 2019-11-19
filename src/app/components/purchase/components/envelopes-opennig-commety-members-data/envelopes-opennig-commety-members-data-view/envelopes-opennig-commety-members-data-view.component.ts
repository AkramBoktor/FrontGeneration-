
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EnvelopesOpennigCommetyMembersData } from 'app/shared/models/envelopes-opennig-commety-members-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EnvelopesOpennigCommetyMembersDataService } from '../shared/envelopes-opennig-commety-members-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-envelopes-opennig-commety-members-data-view',
  templateUrl: './envelopes-opennig-commety-members-data-view.component.html',
  styleUrls: ['./envelopes-opennig-commety-members-data-view.component.scss'],
  providers: []
})

export class EnvelopesOpennigCommetyMembersDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEnvelopesOpennigCommetyMembersData: EnvelopesOpennigCommetyMembersData;
  envelopesOpennigCommetyMembersDataForm: FormGroup;

  private offeringTypesService: LookupService;
private membersService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
memberTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEnvelopesOpennigCommetyMembersDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EnvelopesOpennigCommetyMembersDataViewComponent>,
    public envelopesOpennigCommetyMembersDataService: EnvelopesOpennigCommetyMembersDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  bidNumber : [this.selectedEnvelopesOpennigCommetyMembersData.bidNumber],
  serialMember : [this.selectedEnvelopesOpennigCommetyMembersData.serialMember],
  memberName : [this.selectedEnvelopesOpennigCommetyMembersData.memberName],
  offeringType : [this.selectedEnvelopesOpennigCommetyMembersData.offeringType],
  memberType : [this.selectedEnvelopesOpennigCommetyMembersData.memberType]
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
    return this.envelopesOpennigCommetyMembersDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.envelopesOpennigCommetyMembersDataForm.controls)) {
      this.envelopesOpennigCommetyMembersDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.membersService = new LookupService('members', this.http);
  }
}

