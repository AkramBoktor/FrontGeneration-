
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordThePositionOfNeedToBeRemoved } from 'app/shared/models/record-the-position-of-need-to-be-removed';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordThePositionOfNeedToBeRemovedService } from '../shared/record-the-position-of-need-to-be-removed.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-position-of-need-to-be-removed-new',
  templateUrl: './record-the-position-of-need-to-be-removed-new.component.html',
  styleUrls: ['./record-the-position-of-need-to-be-removed-new.component.scss'],
  providers: [
    ]
})

export class RecordThePositionOfNeedToBeRemovedNewComponent extends AppBaseComponent implements OnInit {
  recordThePositionOfNeedToBeRemovedForm: FormGroup;
  @Input() selectedRecordThePositionOfNeedToBeRemoved: RecordThePositionOfNeedToBeRemoved;
  errorMessages: FormControlError[] = [
        
  ];

  private educationalNeedAttitudesService: LookupService;
private positionAreaNeedsService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;
needCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;
	@ViewChild('needCode', { static: true }) NeedCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecordThePositionOfNeedToBeRemovedNewComponent>,
    public recordThePositionOfNeedToBeRemovedService: RecordThePositionOfNeedToBeRemovedService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordThePositionOfNeedToBeRemoved = new RecordThePositionOfNeedToBeRemoved();

    
	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.educationalNeedAttitudesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الموقف',
	});

	this.needCodeSelectOptions = new MaterialSelectOptions({
	 data: this.positionAreaNeedsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاحتياج',
	});


    this.recordThePositionOfNeedToBeRemovedForm = this.formBuilder.group({
     
  id : [0],
  schoolCode : [this.selectedRecordThePositionOfNeedToBeRemoved.schoolCode, [ Validators.required ]],
  extension : [this.selectedRecordThePositionOfNeedToBeRemoved.extension, [ Validators.required ]],
  status : [this.selectedRecordThePositionOfNeedToBeRemoved.status, [ Validators.required ]],
  needCode : [this.selectedRecordThePositionOfNeedToBeRemoved.needCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.recordThePositionOfNeedToBeRemovedService.create(this.recordThePositionOfNeedToBeRemovedForm.value)
        .pipe(switchMap(x => {
			return this.recordThePositionOfNeedToBeRemovedService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordThePositionOfNeedToBeRemovedForm.get(name);
    }

  initializeLookupServices() {
    this.educationalNeedAttitudesService = new LookupService('educationalneedattitudes', this.http);
this.positionAreaNeedsService = new LookupService('positionareaneeds', this.http);
  }
 }
