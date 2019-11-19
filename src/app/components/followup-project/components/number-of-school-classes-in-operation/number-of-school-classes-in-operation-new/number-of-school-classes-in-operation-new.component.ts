
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { NumberOfSchoolClassesInOperation } from 'app/shared/models/number-of-school-classes-in-operation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NumberOfSchoolClassesInOperationService } from '../shared/number-of-school-classes-in-operation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-number-of-school-classes-in-operation-new',
  templateUrl: './number-of-school-classes-in-operation-new.component.html',
  styleUrls: ['./number-of-school-classes-in-operation-new.component.scss'],
  providers: [
    ]
})

export class NumberOfSchoolClassesInOperationNewComponent extends AppBaseComponent implements OnInit {
  numberOfSchoolClassesInOperationForm: FormGroup;
  @Input() selectedNumberOfSchoolClassesInOperation: NumberOfSchoolClassesInOperation;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<NumberOfSchoolClassesInOperationNewComponent>,
    public numberOfSchoolClassesInOperationService: NumberOfSchoolClassesInOperationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNumberOfSchoolClassesInOperation = new NumberOfSchoolClassesInOperation();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.numberOfSchoolClassesInOperationForm = this.formBuilder.group({
     
  id : [0],
  projectCode : [this.selectedNumberOfSchoolClassesInOperation.projectCode, [ Validators.required ]],
  classesNumber : [this.selectedNumberOfSchoolClassesInOperation.classesNumber, [ Validators.required ]],
  branchCode : [this.selectedNumberOfSchoolClassesInOperation.branchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.numberOfSchoolClassesInOperationService.create(this.numberOfSchoolClassesInOperationForm.value)
        .pipe(switchMap(x => {
			return this.numberOfSchoolClassesInOperationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.numberOfSchoolClassesInOperationForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
 }
