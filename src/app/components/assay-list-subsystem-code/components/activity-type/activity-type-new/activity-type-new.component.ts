
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ActivityType } from 'app/shared/models/activity-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ActivityTypeService } from '../shared/activity-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-activity-type-new',
  templateUrl: './activity-type-new.component.html',
  styleUrls: ['./activity-type-new.component.scss'],
  providers: [
    ]
})

export class ActivityTypeNewComponent extends AppBaseComponent implements OnInit {
  activityTypeForm: FormGroup;
  @Input() selectedActivityType: ActivityType;
  errorMessages: FormControlError[] = [
        
  ];

  private workTypesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ActivityTypeNewComponent>,
    public activityTypeService: ActivityTypeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedActivityType = new ActivityType();

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.activityTypeForm = this.formBuilder.group({
     
  id : [0],
  code : [this.selectedActivityType.code, [ Validators.required ]],
  name : [this.selectedActivityType.name, [ Validators.required ]],
  workType : [this.selectedActivityType.workType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.activityTypeService.create(this.activityTypeForm.value)
        .pipe(switchMap(x => {
			return this.activityTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.activityTypeForm.get(name);
    }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
  }
 }
