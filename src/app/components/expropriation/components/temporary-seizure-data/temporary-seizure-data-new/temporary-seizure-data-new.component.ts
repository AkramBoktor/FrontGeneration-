
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TemporarySeizureData } from 'app/shared/models/temporary-seizure-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TemporarySeizureDataService } from '../shared/temporary-seizure-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-temporary-seizure-data-new',
  templateUrl: './temporary-seizure-data-new.component.html',
  styleUrls: ['./temporary-seizure-data-new.component.scss'],
  providers: [
    ]
})

export class TemporarySeizureDataNewComponent extends AppBaseComponent implements OnInit {
  temporarySeizureDataForm: FormGroup;
  @Input() selectedTemporarySeizureData: TemporarySeizureData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TemporarySeizureDataNewComponent>,
    public temporarySeizureDataService: TemporarySeizureDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTemporarySeizureData = new TemporarySeizureData();

    

    this.temporarySeizureDataForm = this.formBuilder.group({
     
  id : [0],
  schoolNumber : [this.selectedTemporarySeizureData.schoolNumber, [ Validators.required ]],
  temporarySeizureNumber : [this.selectedTemporarySeizureData.temporarySeizureNumber, [ Validators.required ]],
  dateOfTemporarySeizure : [this.selectedTemporarySeizureData.dateOfTemporarySeizure, [ Validators.required ]],
  numberOfPublicationsInEgyptianFacts : [this.selectedTemporarySeizureData.numberOfPublicationsInEgyptianFacts, [ Validators.required ]],
  dateOfPublicationInTheEgyptianFacts : [this.selectedTemporarySeizureData.dateOfPublicationInTheEgyptianFacts, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.temporarySeizureDataService.create(this.temporarySeizureDataForm.value)
        .pipe(switchMap(x => {
			return this.temporarySeizureDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.temporarySeizureDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
