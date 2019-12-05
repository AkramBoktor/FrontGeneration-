
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordThePositionOfTheInternship } from 'app/shared/models/record-the-position-of-the-internship';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordThePositionOfTheInternshipService } from '../shared/record-the-position-of-the-internship.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-position-of-the-internship-edit',
  templateUrl: './record-the-position-of-the-internship-edit.component.html',
  styleUrls: ['./record-the-position-of-the-internship-edit.component.scss'],
  providers: []
})

export class RecordThePositionOfTheInternshipEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordThePositionOfTheInternship: RecordThePositionOfTheInternship;
  recordThePositionOfTheInternshipForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private subDepartmentsService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordThePositionOfTheInternshipDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordThePositionOfTheInternshipEditComponent>,
    public recordThePositionOfTheInternshipService: RecordThePositionOfTheInternshipService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordThePositionOfTheInternship = new RecordThePositionOfTheInternship();
    this.selectedRecordThePositionOfTheInternship = this.selectedRecordThePositionOfTheInternshipDialog.data || this.selectedRecordThePositionOfTheInternship;

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});


    this.recordThePositionOfTheInternshipForm = this.formBuilder.group({
      
  id : [this.selectedRecordThePositionOfTheInternship.id],
  date : [this.selectedRecordThePositionOfTheInternship.date, [ Validators.required ]],
  trainingNumber : [this.selectedRecordThePositionOfTheInternship.trainingNumber, [ Validators.required ]],
  trainingTopic : [this.selectedRecordThePositionOfTheInternship.trainingTopic, [ Validators.required ]],
  administrationCode : [this.selectedRecordThePositionOfTheInternship.administrationCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordThePositionOfTheInternshipService.update(this.recordThePositionOfTheInternshipForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordThePositionOfTheInternshipService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordThePositionOfTheInternshipForm.get(name);
  }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}
