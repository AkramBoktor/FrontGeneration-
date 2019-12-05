
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EmployeesWhoHaveCorrection } from 'app/shared/models/employees-who-have-correction';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeesWhoHaveCorrectionService } from '../shared/employees-who-have-correction.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employees-who-have-correction-new',
  templateUrl: './employees-who-have-correction-new.component.html',
  styleUrls: ['./employees-who-have-correction-new.component.scss'],
  providers: [
    ]
})

export class EmployeesWhoHaveCorrectionNewComponent extends AppBaseComponent implements OnInit {
  employeesWhoHaveCorrectionForm: FormGroup;
  @Input() selectedEmployeesWhoHaveCorrection: EmployeesWhoHaveCorrection;
  errorMessages: FormControlError[] = [
        
  ];

  private entryTypesService: LookupService;

  
entryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entryType', { static: true }) EntryTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeesWhoHaveCorrectionNewComponent>,
    public employeesWhoHaveCorrectionService: EmployeesWhoHaveCorrectionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeesWhoHaveCorrection = new EmployeesWhoHaveCorrection();

    
	this.entryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الادخال',
	});


    this.employeesWhoHaveCorrectionForm = this.formBuilder.group({
     
  id : [0],
  incomingYearAndMonth : [this.selectedEmployeesWhoHaveCorrection.incomingYearAndMonth, [ Validators.required ]],
  employeeCode : [this.selectedEmployeesWhoHaveCorrection.employeeCode, [ Validators.required ]],
  employeeDate : [this.selectedEmployeesWhoHaveCorrection.employeeDate, [ Validators.required ]],
  entryType : [this.selectedEmployeesWhoHaveCorrection.entryType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.employeesWhoHaveCorrectionService.create(this.employeesWhoHaveCorrectionForm.value)
        .pipe(switchMap(x => {
			return this.employeesWhoHaveCorrectionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeesWhoHaveCorrectionForm.get(name);
    }

  initializeLookupServices() {
    this.entryTypesService = new LookupService('entrytypes', this.http);
  }
 }
