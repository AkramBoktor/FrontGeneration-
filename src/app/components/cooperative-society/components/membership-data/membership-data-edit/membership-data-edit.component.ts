
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MembershipData } from 'app/shared/models/membership-data';
import { switchMap } from 'rxjs/operators';
import { MembershipDataService } from '../shared/membership-data.service';




@Component({
  selector: 'app-membership-data-edit',
  templateUrl: './membership-data-edit.component.html',
  styleUrls: ['./membership-data-edit.component.scss'],
  providers: []
})

export class MembershipDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMembershipData: MembershipData;
  membershipDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMembershipDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<MembershipDataEditComponent>,
    public membershipDataService: MembershipDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMembershipData = new MembershipData();
    this.selectedMembershipData = this.selectedMembershipDataDialog.data || this.selectedMembershipData;

    

    this.membershipDataForm = this.formBuilder.group({
      
  id : [this.selectedMembershipData.id],
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
    this.membershipDataService.update(this.membershipDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.membershipDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.membershipDataForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
