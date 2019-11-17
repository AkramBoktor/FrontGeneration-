
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Retirement } from 'app/shared/models/retirement';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { RetirementService } from '../shared/retirement.service';




@Component({
  selector: 'app-retirement-edit',
  templateUrl: './retirement-edit.component.html',
  styleUrls: ['./retirement-edit.component.scss'],
  providers: []
})

export class RetirementEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRetirement: Retirement;
  retirementForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private leavingServiceReasonsService: LookupService;

  
terminationReasonSelectOptions: MaterialSelectOptions;

  
	@ViewChild('terminationReason', { static: true }) TerminationReasonSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRetirementDialog: any,
    @Optional() public dialogRef: MatDialogRef<RetirementEditComponent>,
    public retirementService: RetirementService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRetirement = new Retirement();
    this.selectedRetirement = this.selectedRetirementDialog.data || this.selectedRetirement;

    
	this.terminationReasonSelectOptions = new MaterialSelectOptions({
	 data: this.leavingServiceReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب انهاء الخدمه',
	});


    this.retirementForm = this.formBuilder.group({
      
  id : [this.selectedRetirement.id],
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
    this.retirementService.update(this.retirementForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.retirementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.retirementForm.get(name);
  }

  initializeLookupServices() {
    this.leavingServiceReasonsService = new LookupService('leavingservicereasons', this.http);
  }
}
