
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { NoteSeenByTheChemistryLaboratory } from 'app/shared/models/note-seen-by-the-chemistry-laboratory';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { NoteSeenByTheChemistryLaboratoryService } from '../shared/note-seen-by-the-chemistry-laboratory.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-note-seen-by-the-chemistry-laboratory-edit',
  templateUrl: './note-seen-by-the-chemistry-laboratory-edit.component.html',
  styleUrls: ['./note-seen-by-the-chemistry-laboratory-edit.component.scss'],
  providers: []
})

export class NoteSeenByTheChemistryLaboratoryEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNoteSeenByTheChemistryLaboratory: NoteSeenByTheChemistryLaboratory;
  noteSeenByTheChemistryLaboratoryForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNoteSeenByTheChemistryLaboratoryDialog: any,
    @Optional() public dialogRef: MatDialogRef<NoteSeenByTheChemistryLaboratoryEditComponent>,
    public noteSeenByTheChemistryLaboratoryService: NoteSeenByTheChemistryLaboratoryService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNoteSeenByTheChemistryLaboratory = new NoteSeenByTheChemistryLaboratory();
    this.selectedNoteSeenByTheChemistryLaboratory = this.selectedNoteSeenByTheChemistryLaboratoryDialog.data || this.selectedNoteSeenByTheChemistryLaboratory;

    

    this.noteSeenByTheChemistryLaboratoryForm = this.formBuilder.group({
      
  id : [this.selectedNoteSeenByTheChemistryLaboratory.id],
  barcodeNumber : [this.selectedNoteSeenByTheChemistryLaboratory.barcodeNumber, [ Validators.required ]],
  notes : [this.selectedNoteSeenByTheChemistryLaboratory.notes, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.noteSeenByTheChemistryLaboratoryService.update(this.noteSeenByTheChemistryLaboratoryForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.noteSeenByTheChemistryLaboratoryService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.noteSeenByTheChemistryLaboratoryForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
