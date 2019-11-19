
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MembershipData } from 'app/shared/models/membership-data';
import { switchMap } from 'rxjs/operators';
import { MembershipDataService } from '../shared/membership-data.service';


@Component({
  selector: 'app-membership-data-new',
  templateUrl: './membership-data-new.component.html',
  styleUrls: ['./membership-data-new.component.scss'],
  providers: [
    ]
})

export class MembershipDataNewComponent extends AppBaseComponent implements OnInit {
  membershipDataForm: FormGroup;
  @Input() selectedMembershipData: MembershipData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MembershipDataNewComponent>,
    public membershipDataService: MembershipDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMembershipData = new MembershipData();

    

    this.membershipDataForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedMembershipData.employeeCode, [ Validators.required ]],
  job : [this.selectedMembershipData.job, [ ]],
  iDNumber : [this.selectedMembershipData.iDNumber, [ ]],
  residence : [this.selectedMembershipData.residence, [ ]],
  sharesNumber : [this.selectedMembershipData.sharesNumber, [ Validators.required ]],
  membershipNumber : [this.selectedMembershipData.membershipNumber, [ Validators.required ]],
  membershipDate : [this.selectedMembershipData.membershipDate, [ Validators.required ]],
  profitAmount : [this.selectedMembershipData.profitAmount, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.membershipDataService.create(this.membershipDataForm.value)
        .pipe(switchMap(x => {
			return this.membershipDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.membershipDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
