
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TheCorrespondingSchoolNumber } from 'app/shared/models/the-corresponding-school-number';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheCorrespondingSchoolNumberService } from '../shared/the-corresponding-school-number.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-corresponding-school-number-new',
  templateUrl: './the-corresponding-school-number-new.component.html',
  styleUrls: ['./the-corresponding-school-number-new.component.scss'],
  providers: [
    ]
})

export class TheCorrespondingSchoolNumberNewComponent extends AppBaseComponent implements OnInit {
  theCorrespondingSchoolNumberForm: FormGroup;
  @Input() selectedTheCorrespondingSchoolNumber: TheCorrespondingSchoolNumber;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TheCorrespondingSchoolNumberNewComponent>,
    public theCorrespondingSchoolNumberService: TheCorrespondingSchoolNumberService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheCorrespondingSchoolNumber = new TheCorrespondingSchoolNumber();

    

    this.theCorrespondingSchoolNumberForm = this.formBuilder.group({
     
  id : [0],
  oderNumber : [this.selectedTheCorrespondingSchoolNumber.oderNumber, [ Validators.required ]],
  currentSchoolCode : [this.selectedTheCorrespondingSchoolNumber.currentSchoolCode, [ Validators.required ]],
  correspondingSchool : [this.selectedTheCorrespondingSchoolNumber.correspondingSchool, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.theCorrespondingSchoolNumberService.create(this.theCorrespondingSchoolNumberForm.value)
        .pipe(switchMap(x => {
			return this.theCorrespondingSchoolNumberService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.theCorrespondingSchoolNumberForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
