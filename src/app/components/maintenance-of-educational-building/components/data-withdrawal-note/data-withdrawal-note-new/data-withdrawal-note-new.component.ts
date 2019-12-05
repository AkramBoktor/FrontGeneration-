
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataWithdrawalNote } from 'app/shared/models/data-withdrawal-note';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataWithdrawalNoteService } from '../shared/data-withdrawal-note.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-withdrawal-note-new',
  templateUrl: './data-withdrawal-note-new.component.html',
  styleUrls: ['./data-withdrawal-note-new.component.scss'],
  providers: [
    ]
})

export class DataWithdrawalNoteNewComponent extends AppBaseComponent implements OnInit {
  dataWithdrawalNoteForm: FormGroup;
  @Input() selectedDataWithdrawalNote: DataWithdrawalNote;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataWithdrawalNoteNewComponent>,
    public dataWithdrawalNoteService: DataWithdrawalNoteService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataWithdrawalNote = new DataWithdrawalNote();

    
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
     
  id : [0],
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
    this.dataWithdrawalNoteService.create(this.dataWithdrawalNoteForm.value)
        .pipe(switchMap(x => {
			return this.dataWithdrawalNoteService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataWithdrawalNoteForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
 }
