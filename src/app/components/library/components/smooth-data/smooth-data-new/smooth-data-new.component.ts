
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SmoothData } from 'app/shared/models/smooth-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SmoothDataService } from '../shared/smooth-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-smooth-data-new',
  templateUrl: './smooth-data-new.component.html',
  styleUrls: ['./smooth-data-new.component.scss'],
  providers: [
    ]
})

export class SmoothDataNewComponent extends AppBaseComponent implements OnInit {
  smoothDataForm: FormGroup;
  @Input() selectedSmoothData: SmoothData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SmoothDataNewComponent>,
    public smoothDataService: SmoothDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSmoothData = new SmoothData();

    

    this.smoothDataForm = this.formBuilder.group({
     
  id : [0],
  seriesCode : [this.selectedSmoothData.seriesCode, [ Validators.required ]],
  seriesTitle : [this.selectedSmoothData.seriesTitle, [ Validators.required ]],
  bookNumber : [this.selectedSmoothData.bookNumber, [ Validators.required ]],
  bookTitle : [this.selectedSmoothData.bookTitle, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.smoothDataService.create(this.smoothDataForm.value)
        .pipe(switchMap(x => {
			return this.smoothDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.smoothDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
