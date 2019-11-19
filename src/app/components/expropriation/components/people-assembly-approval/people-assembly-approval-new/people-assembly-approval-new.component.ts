
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PeopleAssemblyApproval } from 'app/shared/models/people-assembly-approval';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PeopleAssemblyApprovalService } from '../shared/people-assembly-approval.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-people-assembly-approval-new',
  templateUrl: './people-assembly-approval-new.component.html',
  styleUrls: ['./people-assembly-approval-new.component.scss'],
  providers: [
    ]
})

export class PeopleAssemblyApprovalNewComponent extends AppBaseComponent implements OnInit {
  peopleAssemblyApprovalForm: FormGroup;
  @Input() selectedPeopleAssemblyApproval: PeopleAssemblyApproval;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PeopleAssemblyApprovalNewComponent>,
    public peopleAssemblyApprovalService: PeopleAssemblyApprovalService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeopleAssemblyApproval = new PeopleAssemblyApproval();

    

    this.peopleAssemblyApprovalForm = this.formBuilder.group({
     
  id : [0],
  schoolNumber : [this.selectedPeopleAssemblyApproval.schoolNumber, [ Validators.required ]],
  theNumber : [this.selectedPeopleAssemblyApproval.theNumber, [ Validators.required ]],
  date : [this.selectedPeopleAssemblyApproval.date, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.peopleAssemblyApprovalService.create(this.peopleAssemblyApprovalForm.value)
        .pipe(switchMap(x => {
			return this.peopleAssemblyApprovalService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.peopleAssemblyApprovalForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
