
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssignmentData } from 'app/shared/models/assignment-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssignmentDataService } from '../shared/assignment-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assignment-data-new',
  templateUrl: './assignment-data-new.component.html',
  styleUrls: ['./assignment-data-new.component.scss'],
  providers: [
    ]
})

export class AssignmentDataNewComponent extends AppBaseComponent implements OnInit {
  assignmentDataForm: FormGroup;
  @Input() selectedAssignmentData: AssignmentData;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssignmentDataNewComponent>,
    public assignmentDataService: AssignmentDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssignmentData = new AssignmentData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.assignmentDataForm = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedAssignmentData.bidNumber, [ Validators.required ]],
  technicalReport : [this.selectedAssignmentData.technicalReport, [ Validators.required ]],
  offeringType : [this.selectedAssignmentData.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.assignmentDataService.create(this.assignmentDataForm.value)
        .pipe(switchMap(x => {
			return this.assignmentDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assignmentDataForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
