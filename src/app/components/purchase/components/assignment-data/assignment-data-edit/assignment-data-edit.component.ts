
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AssignmentData } from 'app/shared/models/assignment-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AssignmentDataService } from '../shared/assignment-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assignment-data-edit',
  templateUrl: './assignment-data-edit.component.html',
  styleUrls: ['./assignment-data-edit.component.scss'],
  providers: []
})

export class AssignmentDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssignmentData: AssignmentData;
  assignmentDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssignmentDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssignmentDataEditComponent>,
    public assignmentDataService: AssignmentDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssignmentData = new AssignmentData();
    this.selectedAssignmentData = this.selectedAssignmentDataDialog.data || this.selectedAssignmentData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.assignmentDataForm = this.formBuilder.group({
      
  id : [this.selectedAssignmentData.id],
  bidNumber : [this.selectedAssignmentData.bidNumber, [ Validators.required ]],
  technicalReport : [this.selectedAssignmentData.technicalReport, [ Validators.required ]],
  offeringType : [this.selectedAssignmentData.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.assignmentDataService.update(this.assignmentDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assignmentDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.assignmentDataForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
