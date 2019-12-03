
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubActivityType } from 'app/shared/models/sub-activity-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubActivityTypeService } from '../shared/sub-activity-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sub-activity-type-new',
  templateUrl: './sub-activity-type-new.component.html',
  styleUrls: ['./sub-activity-type-new.component.scss'],
  providers: [
    ]
})

export class SubActivityTypeNewComponent extends AppBaseComponent implements OnInit {
  subActivityTypeForm: FormGroup;
  @Input() selectedSubActivityType: SubActivityType;
  errorMessages: FormControlError[] = [
        
  ];

  private workTypesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  
activityTypeIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SubActivityTypeNewComponent>,
    public subActivityTypeService: SubActivityTypeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubActivityType = new SubActivityType();

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.subActivityTypeForm = this.formBuilder.group({
     
  id : [0],
  activityType : [this.selectedSubActivityType.activityType, [ Validators.required ]],
  code : [this.selectedSubActivityType.code, [ Validators.required ]],
  name : [this.selectedSubActivityType.name, [ Validators.required ]],
  workType : [this.selectedSubActivityType.workType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subActivityTypeService.create(this.subActivityTypeForm.value)
        .pipe(switchMap(x => {
			return this.subActivityTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subActivityTypeForm.get(name);
    }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
  }
 }
