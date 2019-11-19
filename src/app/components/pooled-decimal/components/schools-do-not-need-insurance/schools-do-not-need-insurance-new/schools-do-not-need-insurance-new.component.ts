
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SchoolsDoNotNeedInsurance } from 'app/shared/models/schools-do-not-need-insurance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolsDoNotNeedInsuranceService } from '../shared/schools-do-not-need-insurance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schools-do-not-need-insurance-new',
  templateUrl: './schools-do-not-need-insurance-new.component.html',
  styleUrls: ['./schools-do-not-need-insurance-new.component.scss'],
  providers: [
    ]
})

export class SchoolsDoNotNeedInsuranceNewComponent extends AppBaseComponent implements OnInit {
  schoolsDoNotNeedInsuranceForm: FormGroup;
  @Input() selectedSchoolsDoNotNeedInsurance: SchoolsDoNotNeedInsurance;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SchoolsDoNotNeedInsuranceNewComponent>,
    public schoolsDoNotNeedInsuranceService: SchoolsDoNotNeedInsuranceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsDoNotNeedInsurance = new SchoolsDoNotNeedInsurance();

    

    this.schoolsDoNotNeedInsuranceForm = this.formBuilder.group({
     
  id : [0],
  theNumberOfTheLetter : [this.selectedSchoolsDoNotNeedInsurance.theNumberOfTheLetter, [ Validators.required ]],
  schoolNumber : [this.selectedSchoolsDoNotNeedInsurance.schoolNumber, [ Validators.required ]],
  annexNumber : [this.selectedSchoolsDoNotNeedInsurance.annexNumber, [ Validators.required ]],
  modelNumber : [this.selectedSchoolsDoNotNeedInsurance.modelNumber, [ Validators.required ]],
  numberOfFloors : [this.selectedSchoolsDoNotNeedInsurance.numberOfFloors, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.schoolsDoNotNeedInsuranceService.create(this.schoolsDoNotNeedInsuranceForm.value)
        .pipe(switchMap(x => {
			return this.schoolsDoNotNeedInsuranceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.schoolsDoNotNeedInsuranceForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
