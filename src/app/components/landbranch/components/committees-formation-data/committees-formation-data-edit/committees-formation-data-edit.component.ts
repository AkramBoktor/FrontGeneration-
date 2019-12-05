
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CommitteesFormationData } from 'app/shared/models/committees-formation-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CommitteesFormationDataService } from '../shared/committees-formation-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-committees-formation-data-edit',
  templateUrl: './committees-formation-data-edit.component.html',
  styleUrls: ['./committees-formation-data-edit.component.scss'],
  providers: []
})

export class CommitteesFormationDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCommitteesFormationData: CommitteesFormationData;
  committeesFormationDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private committeeTypeCodesService: LookupService;

  
committeeTypeCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('committeeTypeCode', { static: true }) CommitteeTypeCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCommitteesFormationDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<CommitteesFormationDataEditComponent>,
    public committeesFormationDataService: CommitteesFormationDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCommitteesFormationData = new CommitteesFormationData();
    this.selectedCommitteesFormationData = this.selectedCommitteesFormationDataDialog.data || this.selectedCommitteesFormationData;

    
	this.committeeTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.committeeTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع اللجنه',
	});


    this.committeesFormationDataForm = this.formBuilder.group({
      
  id : [this.selectedCommitteesFormationData.id],
  formationDate : [this.selectedCommitteesFormationData.formationDate, [ Validators.required ]],
  committeeNumber : [this.selectedCommitteesFormationData.committeeNumber, [ Validators.required ]],
  committeeMemberNumber : [this.selectedCommitteesFormationData.committeeMemberNumber, [ Validators.required ]],
  committeeTypeCode : [this.selectedCommitteesFormationData.committeeTypeCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.committeesFormationDataService.update(this.committeesFormationDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.committeesFormationDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.committeesFormationDataForm.get(name);
  }

  initializeLookupServices() {
    this.committeeTypeCodesService = new LookupService('committeetypecodes', this.http);
  }
}
