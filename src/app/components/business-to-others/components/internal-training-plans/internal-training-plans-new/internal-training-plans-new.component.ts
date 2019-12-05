
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { InternalTrainingPlans } from 'app/shared/models/internal-training-plans';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InternalTrainingPlansService } from '../shared/internal-training-plans.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-internal-training-plans-new',
  templateUrl: './internal-training-plans-new.component.html',
  styleUrls: ['./internal-training-plans-new.component.scss'],
  providers: [
    ]
})

export class InternalTrainingPlansNewComponent extends AppBaseComponent implements OnInit {
  internalTrainingPlansForm: FormGroup;
  @Input() selectedInternalTrainingPlans: InternalTrainingPlans;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;

  
administrationOrBranchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationOrBranchCode', { static: true }) AdministrationOrBranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<InternalTrainingPlansNewComponent>,
    public internalTrainingPlansService: InternalTrainingPlansService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInternalTrainingPlans = new InternalTrainingPlans();

    
	this.administrationOrBranchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة او الفرع',
	});


    this.internalTrainingPlansForm = this.formBuilder.group({
     
  id : [0],
  date : [this.selectedInternalTrainingPlans.date, [ Validators.required ]],
  trainingNumber : [this.selectedInternalTrainingPlans.trainingNumber, [ Validators.required ]],
  trainingTopic : [this.selectedInternalTrainingPlans.trainingTopic, [ Validators.required ]],
  administrationOrBranchCode : [this.selectedInternalTrainingPlans.administrationOrBranchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.internalTrainingPlansService.create(this.internalTrainingPlansForm.value)
        .pipe(switchMap(x => {
			return this.internalTrainingPlansService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.internalTrainingPlansForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
 }
