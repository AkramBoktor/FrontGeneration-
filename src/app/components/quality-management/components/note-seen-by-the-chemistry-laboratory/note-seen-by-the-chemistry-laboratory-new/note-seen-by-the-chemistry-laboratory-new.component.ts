
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { NoteSeenByTheChemistryLaboratory } from 'app/shared/models/note-seen-by-the-chemistry-laboratory';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NoteSeenByTheChemistryLaboratoryService } from '../shared/note-seen-by-the-chemistry-laboratory.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-note-seen-by-the-chemistry-laboratory-new',
  templateUrl: './note-seen-by-the-chemistry-laboratory-new.component.html',
  styleUrls: ['./note-seen-by-the-chemistry-laboratory-new.component.scss'],
  providers: [
    ]
})

export class NoteSeenByTheChemistryLaboratoryNewComponent extends AppBaseComponent implements OnInit {
  noteSeenByTheChemistryLaboratoryForm: FormGroup;
  @Input() selectedNoteSeenByTheChemistryLaboratory: NoteSeenByTheChemistryLaboratory;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<NoteSeenByTheChemistryLaboratoryNewComponent>,
    public noteSeenByTheChemistryLaboratoryService: NoteSeenByTheChemistryLaboratoryService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNoteSeenByTheChemistryLaboratory = new NoteSeenByTheChemistryLaboratory();

    

    this.noteSeenByTheChemistryLaboratoryForm = this.formBuilder.group({
     
  id : [0],
  barcodeNumber : [this.selectedNoteSeenByTheChemistryLaboratory.barcodeNumber, [ Validators.required ]],
  notes : [this.selectedNoteSeenByTheChemistryLaboratory.notes, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.noteSeenByTheChemistryLaboratoryService.create(this.noteSeenByTheChemistryLaboratoryForm.value)
        .pipe(switchMap(x => {
			return this.noteSeenByTheChemistryLaboratoryService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.noteSeenByTheChemistryLaboratoryForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
