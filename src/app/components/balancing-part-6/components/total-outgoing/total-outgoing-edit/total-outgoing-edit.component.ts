
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TotalOutgoing } from 'app/shared/models/total-outgoing';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TotalOutgoingService } from '../shared/total-outgoing.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-total-outgoing-edit',
  templateUrl: './total-outgoing-edit.component.html',
  styleUrls: ['./total-outgoing-edit.component.scss'],
  providers: []
})

export class TotalOutgoingEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTotalOutgoing: TotalOutgoing;
  totalOutgoingForm: FormGroup;
  errorMessages: FormControlError[] = [
          
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTotalOutgoingDialog: any,
    @Optional() public dialogRef: MatDialogRef<TotalOutgoingEditComponent>,
    public totalOutgoingService: TotalOutgoingService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTotalOutgoing = new TotalOutgoing();
    this.selectedTotalOutgoing = this.selectedTotalOutgoingDialog.data || this.selectedTotalOutgoing;

    

    this.totalOutgoingForm = this.formBuilder.group({
      
  id : [this.selectedTotalOutgoing.id],
  schoolNumber : [this.selectedTotalOutgoing.schoolNumber, [ Validators.required ]],
  schoolName : [this.selectedTotalOutgoing.schoolName, [ Validators.required ]],
  contractor : [this.selectedTotalOutgoing.contractor, [ Validators.required ]],
  contractorNmae : [this.selectedTotalOutgoing.contractorNmae, [ Validators.required ]],
  bidNumber : [this.selectedTotalOutgoing.bidNumber, [ Validators.required ]],
  totalOutgoing : [this.selectedTotalOutgoing.totalOutgoing, [ Validators.required,Validators.minLength(0) ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.totalOutgoingService.update(this.totalOutgoingForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.totalOutgoingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.totalOutgoingForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
