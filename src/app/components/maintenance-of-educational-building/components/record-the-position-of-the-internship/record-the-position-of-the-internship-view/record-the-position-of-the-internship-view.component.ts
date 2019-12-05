
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordThePositionOfTheInternship } from 'app/shared/models/record-the-position-of-the-internship';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordThePositionOfTheInternshipService } from '../shared/record-the-position-of-the-internship.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-position-of-the-internship-view',
  templateUrl: './record-the-position-of-the-internship-view.component.html',
  styleUrls: ['./record-the-position-of-the-internship-view.component.scss'],
  providers: []
})

export class RecordThePositionOfTheInternshipViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordThePositionOfTheInternship: RecordThePositionOfTheInternship;
  recordThePositionOfTheInternshipForm: FormGroup;

  private subDepartmentsService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordThePositionOfTheInternshipDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordThePositionOfTheInternshipViewComponent>,
    public recordThePositionOfTheInternshipService: RecordThePositionOfTheInternshipService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordThePositionOfTheInternship = this.selectedRecordThePositionOfTheInternshipDialog.data || this.selectedRecordThePositionOfTheInternship;

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});


    this.recordThePositionOfTheInternshipForm = this.formBuilder.group({
      
  date : [this.selectedRecordThePositionOfTheInternship.date],
  trainingNumber : [this.selectedRecordThePositionOfTheInternship.trainingNumber],
  trainingTopic : [this.selectedRecordThePositionOfTheInternship.trainingTopic],
  administrationCode : [this.selectedRecordThePositionOfTheInternship.administrationCode]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.recordThePositionOfTheInternshipForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordThePositionOfTheInternshipForm.controls)) {
      this.recordThePositionOfTheInternshipForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

