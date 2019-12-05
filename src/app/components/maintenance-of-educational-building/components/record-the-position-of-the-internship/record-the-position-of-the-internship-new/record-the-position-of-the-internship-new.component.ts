
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordThePositionOfTheInternship } from 'app/shared/models/record-the-position-of-the-internship';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordThePositionOfTheInternshipService } from '../shared/record-the-position-of-the-internship.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-position-of-the-internship-new',
  templateUrl: './record-the-position-of-the-internship-new.component.html',
  styleUrls: ['./record-the-position-of-the-internship-new.component.scss'],
  providers: [
    ]
})

export class RecordThePositionOfTheInternshipNewComponent extends AppBaseComponent implements OnInit {
  recordThePositionOfTheInternshipForm: FormGroup;
  @Input() selectedRecordThePositionOfTheInternship: RecordThePositionOfTheInternship;
  errorMessages: FormControlError[] = [
        
  ];

  private subDepartmentsService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecordThePositionOfTheInternshipNewComponent>,
    public recordThePositionOfTheInternshipService: RecordThePositionOfTheInternshipService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordThePositionOfTheInternship = new RecordThePositionOfTheInternship();

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});


    this.recordThePositionOfTheInternshipForm = this.formBuilder.group({
     
  id : [0],
  date : [this.selectedRecordThePositionOfTheInternship.date, [ Validators.required ]],
  trainingNumber : [this.selectedRecordThePositionOfTheInternship.trainingNumber, [ Validators.required ]],
  trainingTopic : [this.selectedRecordThePositionOfTheInternship.trainingTopic, [ Validators.required ]],
  administrationCode : [this.selectedRecordThePositionOfTheInternship.administrationCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.recordThePositionOfTheInternshipService.create(this.recordThePositionOfTheInternshipForm.value)
        .pipe(switchMap(x => {
			return this.recordThePositionOfTheInternshipService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordThePositionOfTheInternshipForm.get(name);
    }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
 }
