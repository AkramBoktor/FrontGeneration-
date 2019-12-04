
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExternalJobType } from 'app/shared/models/external-job-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExternalJobTypeService } from '../shared/external-job-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-external-job-type-new',
  templateUrl: './external-job-type-new.component.html',
  styleUrls: ['./external-job-type-new.component.scss'],
  providers: [
    ]
})

export class ExternalJobTypeNewComponent extends AppBaseComponent implements OnInit {
  externalJobTypeForm: FormGroup;
  @Input() selectedExternalJobType: ExternalJobType;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExternalJobTypeNewComponent>,
    public externalJobTypeService: ExternalJobTypeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalJobType = new ExternalJobType();

    

    this.externalJobTypeForm = this.formBuilder.group({
     
  id : [0],
  eexternaljobcode : [this.selectedExternalJobType.eexternaljobcode, [ Validators.required ]],
  externaljobname : [this.selectedExternalJobType.externaljobname, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.externalJobTypeService.create(this.externalJobTypeForm.value)
        .pipe(switchMap(x => {
			return this.externalJobTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.externalJobTypeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
