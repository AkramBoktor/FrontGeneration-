
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EnvelopesOpennigCommetyMembersData } from 'app/shared/models/envelopes-opennig-commety-members-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EnvelopesOpennigCommetyMembersDataService } from '../shared/envelopes-opennig-commety-members-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-envelopes-opennig-commety-members-data-new',
  templateUrl: './envelopes-opennig-commety-members-data-new.component.html',
  styleUrls: ['./envelopes-opennig-commety-members-data-new.component.scss'],
  providers: [
    ]
})

export class EnvelopesOpennigCommetyMembersDataNewComponent extends AppBaseComponent implements OnInit {
  envelopesOpennigCommetyMembersDataForm: FormGroup;
  @Input() selectedEnvelopesOpennigCommetyMembersData: EnvelopesOpennigCommetyMembersData;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;
private membersService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
memberTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('memberType', { static: true }) MemberTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EnvelopesOpennigCommetyMembersDataNewComponent>,
    public envelopesOpennigCommetyMembersDataService: EnvelopesOpennigCommetyMembersDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnvelopesOpennigCommetyMembersData = new EnvelopesOpennigCommetyMembersData();

    
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
     
  id : [0],
  bidNumber : [this.selectedEnvelopesOpennigCommetyMembersData.bidNumber, [ Validators.required ]],
  serialMember : [this.selectedEnvelopesOpennigCommetyMembersData.serialMember, [ Validators.required ]],
  memberName : [this.selectedEnvelopesOpennigCommetyMembersData.memberName, [ ]],
  offeringType : [this.selectedEnvelopesOpennigCommetyMembersData.offeringType, [ Validators.required ]],
  memberType : [this.selectedEnvelopesOpennigCommetyMembersData.memberType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.envelopesOpennigCommetyMembersDataService.create(this.envelopesOpennigCommetyMembersDataForm.value)
        .pipe(switchMap(x => {
			return this.envelopesOpennigCommetyMembersDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.envelopesOpennigCommetyMembersDataForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.membersService = new LookupService('members', this.http);
  }
 }
