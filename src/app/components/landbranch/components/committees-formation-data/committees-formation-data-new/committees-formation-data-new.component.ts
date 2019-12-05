
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CommitteesFormationData } from 'app/shared/models/committees-formation-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CommitteesFormationDataService } from '../shared/committees-formation-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-committees-formation-data-new',
  templateUrl: './committees-formation-data-new.component.html',
  styleUrls: ['./committees-formation-data-new.component.scss'],
  providers: [
    ]
})

export class CommitteesFormationDataNewComponent extends AppBaseComponent implements OnInit {
  committeesFormationDataForm: FormGroup;
  @Input() selectedCommitteesFormationData: CommitteesFormationData;
  errorMessages: FormControlError[] = [
        
  ];

  private committeeTypeCodesService: LookupService;

  
committeeTypeCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('committeeTypeCode', { static: true }) CommitteeTypeCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CommitteesFormationDataNewComponent>,
    public committeesFormationDataService: CommitteesFormationDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCommitteesFormationData = new CommitteesFormationData();

    
	this.committeeTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.committeeTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع اللجنه',
	});


    this.committeesFormationDataForm = this.formBuilder.group({
     
  id : [0],
  formationDate : [this.selectedCommitteesFormationData.formationDate, [ Validators.required ]],
  committeeNumber : [this.selectedCommitteesFormationData.committeeNumber, [ Validators.required ]],
  committeeMemberNumber : [this.selectedCommitteesFormationData.committeeMemberNumber, [ Validators.required ]],
  committeeTypeCode : [this.selectedCommitteesFormationData.committeeTypeCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.committeesFormationDataService.create(this.committeesFormationDataForm.value)
        .pipe(switchMap(x => {
			return this.committeesFormationDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.committeesFormationDataForm.get(name);
    }

  initializeLookupServices() {
    this.committeeTypeCodesService = new LookupService('committeetypecodes', this.http);
  }
 }
