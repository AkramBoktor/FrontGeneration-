
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataEntryForm129Corrections } from 'app/shared/models/data-entry-form-129-corrections';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataEntryForm129CorrectionsService } from '../shared/data-entry-form-129-corrections.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-entry-form-129-corrections-new',
  templateUrl: './data-entry-form-129-corrections-new.component.html',
  styleUrls: ['./data-entry-form-129-corrections-new.component.scss'],
  providers: [
    ]
})

export class DataEntryForm129CorrectionsNewComponent extends AppBaseComponent implements OnInit {
  dataEntryForm129CorrectionsForm: FormGroup;
  @Input() selectedDataEntryForm129Corrections: DataEntryForm129Corrections;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataEntryForm129CorrectionsNewComponent>,
    public dataEntryForm129CorrectionsService: DataEntryForm129CorrectionsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataEntryForm129Corrections = new DataEntryForm129Corrections();

    

    this.dataEntryForm129CorrectionsForm = this.formBuilder.group({
     
  id : [0],
  correctionNumber : [this.selectedDataEntryForm129Corrections.correctionNumber, [ Validators.required ]],
  month : [this.selectedDataEntryForm129Corrections.month, [ Validators.required ]],
  incomingNumber : [this.selectedDataEntryForm129Corrections.incomingNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dataEntryForm129CorrectionsService.create(this.dataEntryForm129CorrectionsForm.value)
        .pipe(switchMap(x => {
			return this.dataEntryForm129CorrectionsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataEntryForm129CorrectionsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
