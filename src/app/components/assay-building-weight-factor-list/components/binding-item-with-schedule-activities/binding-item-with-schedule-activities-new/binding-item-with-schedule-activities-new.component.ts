
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BindingItemWithScheduleActivities } from 'app/shared/models/binding-item-with-schedule-activities';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BindingItemWithScheduleActivitiesService } from '../shared/binding-item-with-schedule-activities.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-binding-item-with-schedule-activities-new',
  templateUrl: './binding-item-with-schedule-activities-new.component.html',
  styleUrls: ['./binding-item-with-schedule-activities-new.component.scss'],
  providers: [
    ]
})

export class BindingItemWithScheduleActivitiesNewComponent extends AppBaseComponent implements OnInit {
  bindingItemWithScheduleActivitiesForm: FormGroup;
  @Input() selectedBindingItemWithScheduleActivities: BindingItemWithScheduleActivities;
  errorMessages: FormControlError[] = [
        
  ];

  private itemCodesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BindingItemWithScheduleActivitiesNewComponent>,
    public bindingItemWithScheduleActivitiesService: BindingItemWithScheduleActivitiesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBindingItemWithScheduleActivities = new BindingItemWithScheduleActivities();

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.bindingItemWithScheduleActivitiesForm = this.formBuilder.group({
     
  id : [0],
  activityCode : [this.selectedBindingItemWithScheduleActivities.activityCode, [ Validators.required ]],
  itemCode : [this.selectedBindingItemWithScheduleActivities.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.bindingItemWithScheduleActivitiesService.create(this.bindingItemWithScheduleActivitiesForm.value)
        .pipe(switchMap(x => {
			return this.bindingItemWithScheduleActivitiesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.bindingItemWithScheduleActivitiesForm.get(name);
    }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
