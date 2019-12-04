
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { NoteSeenByTheChemistryLaboratory } from 'app/shared/models/note-seen-by-the-chemistry-laboratory';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { NoteSeenByTheChemistryLaboratoryService } from '../shared/note-seen-by-the-chemistry-laboratory.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-note-seen-by-the-chemistry-laboratory-view',
  templateUrl: './note-seen-by-the-chemistry-laboratory-view.component.html',
  styleUrls: ['./note-seen-by-the-chemistry-laboratory-view.component.scss'],
  providers: []
})

export class NoteSeenByTheChemistryLaboratoryViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNoteSeenByTheChemistryLaboratory: NoteSeenByTheChemistryLaboratory;
  noteSeenByTheChemistryLaboratoryForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNoteSeenByTheChemistryLaboratoryDialog: any,
    @Optional() public dialogRef: MatDialogRef<NoteSeenByTheChemistryLaboratoryViewComponent>,
    public noteSeenByTheChemistryLaboratoryService: NoteSeenByTheChemistryLaboratoryService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNoteSeenByTheChemistryLaboratory = this.selectedNoteSeenByTheChemistryLaboratoryDialog.data || this.selectedNoteSeenByTheChemistryLaboratory;

    

    this.noteSeenByTheChemistryLaboratoryForm = this.formBuilder.group({
      
  barcodeNumber : [this.selectedNoteSeenByTheChemistryLaboratory.barcodeNumber],
  notes : [this.selectedNoteSeenByTheChemistryLaboratory.notes]
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
    return this.noteSeenByTheChemistryLaboratoryForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.noteSeenByTheChemistryLaboratoryForm.controls)) {
      this.noteSeenByTheChemistryLaboratoryForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

