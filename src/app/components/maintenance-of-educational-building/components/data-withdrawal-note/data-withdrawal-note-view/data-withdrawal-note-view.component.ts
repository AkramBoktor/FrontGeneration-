
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataWithdrawalNote } from 'app/shared/models/data-withdrawal-note';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataWithdrawalNoteService } from '../shared/data-withdrawal-note.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-withdrawal-note-view',
  templateUrl: './data-withdrawal-note-view.component.html',
  styleUrls: ['./data-withdrawal-note-view.component.scss'],
  providers: []
})

export class DataWithdrawalNoteViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataWithdrawalNote: DataWithdrawalNote;
  dataWithdrawalNoteForm: FormGroup;

  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataWithdrawalNoteDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataWithdrawalNoteViewComponent>,
    public dataWithdrawalNoteService: DataWithdrawalNoteService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataWithdrawalNote = this.selectedDataWithdrawalNoteDialog.data || this.selectedDataWithdrawalNote;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.dataWithdrawalNoteForm = this.formBuilder.group({
      
  offeringNumber : [this.selectedDataWithdrawalNote.offeringNumber],
  offeringName : [this.selectedDataWithdrawalNote.offeringName],
  buildingNumber : [this.selectedDataWithdrawalNote.buildingNumber],
  contractorCode : [this.selectedDataWithdrawalNote.contractorCode],
  noteNumber : [this.selectedDataWithdrawalNote.noteNumber],
  activityCode : [this.selectedDataWithdrawalNote.activityCode],
  stopDate : [this.selectedDataWithdrawalNote.stopDate],
  offeringType : [this.selectedDataWithdrawalNote.offeringType],
  constructionType : [this.selectedDataWithdrawalNote.constructionType]
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
    return this.dataWithdrawalNoteForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataWithdrawalNoteForm.controls)) {
      this.dataWithdrawalNoteForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

