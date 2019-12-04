
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ImplementationDataSchedule } from 'app/shared/models/implementation-data-schedule';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ImplementationDataScheduleService } from '../shared/implementation-data-schedule.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-implementation-data-schedule-new',
  templateUrl: './implementation-data-schedule-new.component.html',
  styleUrls: ['./implementation-data-schedule-new.component.scss'],
  providers: [
    ]
})

export class ImplementationDataScheduleNewComponent extends AppBaseComponent implements OnInit {
  implementationDataScheduleForm: FormGroup;
  @Input() selectedImplementationDataSchedule: ImplementationDataSchedule;
  errorMessages: FormControlError[] = [
        
  ];

  private foundationTypesService: LookupService;

  
baseTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('baseType', { static: true }) BaseTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ImplementationDataScheduleNewComponent>,
    public implementationDataScheduleService: ImplementationDataScheduleService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedImplementationDataSchedule = new ImplementationDataSchedule();

    
	this.baseTypeSelectOptions = new MaterialSelectOptions({
	 data: this.foundationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الأساس',
	});


    this.implementationDataScheduleForm = this.formBuilder.group({
     
  id : [0],
  scheduleCode : [this.selectedImplementationDataSchedule.scheduleCode, [ Validators.required ]],
  executionDuration : [this.selectedImplementationDataSchedule.executionDuration, [ Validators.required ]],
  floorsNumber : [this.selectedImplementationDataSchedule.floorsNumber, [ Validators.required ]],
  baseType : [this.selectedImplementationDataSchedule.baseType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.implementationDataScheduleService.create(this.implementationDataScheduleForm.value)
        .pipe(switchMap(x => {
			return this.implementationDataScheduleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.implementationDataScheduleForm.get(name);
    }

  initializeLookupServices() {
    this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
 }
