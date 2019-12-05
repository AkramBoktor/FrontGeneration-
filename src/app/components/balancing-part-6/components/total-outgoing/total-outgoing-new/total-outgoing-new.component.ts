
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TotalOutgoing } from 'app/shared/models/total-outgoing';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TotalOutgoingService } from '../shared/total-outgoing.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-total-outgoing-new',
  templateUrl: './total-outgoing-new.component.html',
  styleUrls: ['./total-outgoing-new.component.scss'],
  providers: [
    ]
})

export class TotalOutgoingNewComponent extends AppBaseComponent implements OnInit {
  totalOutgoingForm: FormGroup;
  @Input() selectedTotalOutgoing: TotalOutgoing;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TotalOutgoingNewComponent>,
    public totalOutgoingService: TotalOutgoingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTotalOutgoing = new TotalOutgoing();

    

    this.totalOutgoingForm = this.formBuilder.group({
     
  id : [0],
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
    this.totalOutgoingService.create(this.totalOutgoingForm.value)
        .pipe(switchMap(x => {
			return this.totalOutgoingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.totalOutgoingForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
