
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PrivateSchoolTrafficCommittee } from 'app/shared/models/private-school-traffic-committee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PrivateSchoolTrafficCommitteeService } from '../shared/private-school-traffic-committee.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-private-school-traffic-committee-new',
  templateUrl: './private-school-traffic-committee-new.component.html',
  styleUrls: ['./private-school-traffic-committee-new.component.scss'],
  providers: [
    ]
})

export class PrivateSchoolTrafficCommitteeNewComponent extends AppBaseComponent implements OnInit {
  privateSchoolTrafficCommitteeForm: FormGroup;
  @Input() selectedPrivateSchoolTrafficCommittee: PrivateSchoolTrafficCommittee;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PrivateSchoolTrafficCommitteeNewComponent>,
    public privateSchoolTrafficCommitteeService: PrivateSchoolTrafficCommitteeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrivateSchoolTrafficCommittee = new PrivateSchoolTrafficCommittee();

    

    this.privateSchoolTrafficCommitteeForm = this.formBuilder.group({
     
  id : [0],
  schoolCode : [this.selectedPrivateSchoolTrafficCommittee.schoolCode, [ Validators.required ]],
  passageDate : [this.selectedPrivateSchoolTrafficCommittee.passageDate, [ Validators.required ]],
  noteCode : [this.selectedPrivateSchoolTrafficCommittee.noteCode, [ Validators.required ]],
  measures : [this.selectedPrivateSchoolTrafficCommittee.measures, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.privateSchoolTrafficCommitteeService.create(this.privateSchoolTrafficCommitteeForm.value)
        .pipe(switchMap(x => {
			return this.privateSchoolTrafficCommitteeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.privateSchoolTrafficCommitteeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
