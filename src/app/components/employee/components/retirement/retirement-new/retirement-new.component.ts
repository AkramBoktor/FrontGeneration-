
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Retirement } from 'app/shared/models/retirement';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { RetirementService } from '../shared/retirement.service';


@Component({
  selector: 'app-retirement-new',
  templateUrl: './retirement-new.component.html',
  styleUrls: ['./retirement-new.component.scss'],
  providers: [
    ]
})

export class RetirementNewComponent extends AppBaseComponent implements OnInit {
  retirementForm: FormGroup;
  @Input() selectedRetirement: Retirement;
  errorMessages: FormControlError[] = [
        
  ];

  private leavingServiceReasonsService: LookupService;

  
terminationReasonSelectOptions: MaterialSelectOptions;

  
	@ViewChild('terminationReason', { static: true }) TerminationReasonSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RetirementNewComponent>,
    public retirementService: RetirementService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRetirement = new Retirement();

    
	this.terminationReasonSelectOptions = new MaterialSelectOptions({
	 data: this.leavingServiceReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب انهاء الخدمه',
	});


    this.retirementForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedRetirement.employeeCode, [ Validators.required ]],
  decisionCode : [this.selectedRetirement.decisionCode, [ Validators.required ]],
  decisionDate : [this.selectedRetirement.decisionDate, [ Validators.required ]],
  terminationDate : [this.selectedRetirement.terminationDate, [ Validators.required ]],
  terminationReason : [this.selectedRetirement.terminationReason, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.retirementService.create(this.retirementForm.value)
        .pipe(switchMap(x => {
			return this.retirementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.retirementForm.get(name);
    }

  initializeLookupServices() {
    this.leavingServiceReasonsService = new LookupService('leavingservicereasons', this.http);
  }
 }
