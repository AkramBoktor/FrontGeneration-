
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CommitteesFormationData } from 'app/shared/models/committees-formation-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CommitteesFormationDataService } from '../shared/committees-formation-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-committees-formation-data-view',
  templateUrl: './committees-formation-data-view.component.html',
  styleUrls: ['./committees-formation-data-view.component.scss'],
  providers: []
})

export class CommitteesFormationDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCommitteesFormationData: CommitteesFormationData;
  committeesFormationDataForm: FormGroup;

  private committeeTypeCodesService: LookupService;

  
committeeTypeCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCommitteesFormationDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<CommitteesFormationDataViewComponent>,
    public committeesFormationDataService: CommitteesFormationDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCommitteesFormationData = this.selectedCommitteesFormationDataDialog.data || this.selectedCommitteesFormationData;

    
	this.committeeTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.committeeTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع اللجنه',
	});


    this.committeesFormationDataForm = this.formBuilder.group({
      
  formationDate : [this.selectedCommitteesFormationData.formationDate],
  committeeNumber : [this.selectedCommitteesFormationData.committeeNumber],
  committeeMemberNumber : [this.selectedCommitteesFormationData.committeeMemberNumber],
  committeeTypeCode : [this.selectedCommitteesFormationData.committeeTypeCode]
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
    return this.committeesFormationDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.committeesFormationDataForm.controls)) {
      this.committeesFormationDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.committeeTypeCodesService = new LookupService('committeetypecodes', this.http);
  }
}

