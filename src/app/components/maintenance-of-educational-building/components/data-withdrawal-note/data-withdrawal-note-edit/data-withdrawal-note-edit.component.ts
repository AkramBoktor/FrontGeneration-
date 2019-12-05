
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataWithdrawalNote } from 'app/shared/models/data-withdrawal-note';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataWithdrawalNoteService } from '../shared/data-withdrawal-note.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-withdrawal-note-edit',
  templateUrl: './data-withdrawal-note-edit.component.html',
  styleUrls: ['./data-withdrawal-note-edit.component.scss'],
  providers: []
})

export class DataWithdrawalNoteEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataWithdrawalNote: DataWithdrawalNote;
  dataWithdrawalNoteForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataWithdrawalNoteDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataWithdrawalNoteEditComponent>,
    public dataWithdrawalNoteService: DataWithdrawalNoteService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataWithdrawalNote = new DataWithdrawalNote();
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
      
  id : [this.selectedDataWithdrawalNote.id],
  offeringNumber : [this.selectedDataWithdrawalNote.offeringNumber, [ Validators.required ]],
  offeringName : [this.selectedDataWithdrawalNote.offeringName, [ Validators.required ]],
  buildingNumber : [this.selectedDataWithdrawalNote.buildingNumber, [ Validators.required ]],
  contractorCode : [this.selectedDataWithdrawalNote.contractorCode, [ Validators.required ]],
  noteNumber : [this.selectedDataWithdrawalNote.noteNumber, [ Validators.required ]],
  activityCode : [this.selectedDataWithdrawalNote.activityCode, [ Validators.required ]],
  stopDate : [this.selectedDataWithdrawalNote.stopDate, [ Validators.required ]],
  offeringType : [this.selectedDataWithdrawalNote.offeringType, [ Validators.required ]],
  constructionType : [this.selectedDataWithdrawalNote.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataWithdrawalNoteService.update(this.dataWithdrawalNoteForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataWithdrawalNoteService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataWithdrawalNoteForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}
