
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { WorkType } from 'app/shared/models/work-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { WorkTypeService } from '../shared/work-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-work-type-new',
  templateUrl: './work-type-new.component.html',
  styleUrls: ['./work-type-new.component.scss'],
  providers: [
    ]
})

export class WorkTypeNewComponent extends AppBaseComponent implements OnInit {
  workTypeForm: FormGroup;
  @Input() selectedWorkType: WorkType;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<WorkTypeNewComponent>,
    public workTypeService: WorkTypeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedWorkType = new WorkType();

    

    this.workTypeForm = this.formBuilder.group({
     
  id : [0],
  code : [this.selectedWorkType.code, [ Validators.required ]],
  name : [this.selectedWorkType.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.workTypeService.create(this.workTypeForm.value)
        .pipe(switchMap(x => {
			return this.workTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.workTypeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
