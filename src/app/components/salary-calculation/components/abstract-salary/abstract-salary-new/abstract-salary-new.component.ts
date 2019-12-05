
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AbstractSalary } from 'app/shared/models/abstract-salary';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AbstractSalaryService } from '../shared/abstract-salary.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-abstract-salary-new',
  templateUrl: './abstract-salary-new.component.html',
  styleUrls: ['./abstract-salary-new.component.scss'],
  providers: [
    ]
})

export class AbstractSalaryNewComponent extends AppBaseComponent implements OnInit {
  abstractSalaryForm: FormGroup;
  @Input() selectedAbstractSalary: AbstractSalary;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AbstractSalaryNewComponent>,
    public abstractSalaryService: AbstractSalaryService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAbstractSalary = new AbstractSalary();

    

    this.abstractSalaryForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedAbstractSalary.employeeCode, [ Validators.required ]],
  year : [this.selectedAbstractSalary.year, [ Validators.required ]],
  abstractSalary : [this.selectedAbstractSalary.abstractSalary, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.abstractSalaryService.create(this.abstractSalaryForm.value)
        .pipe(switchMap(x => {
			return this.abstractSalaryService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.abstractSalaryForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
