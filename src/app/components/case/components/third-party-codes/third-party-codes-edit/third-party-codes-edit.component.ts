
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ThirdPartyCodes } from 'app/shared/models/third-party-codes';
import { switchMap } from 'rxjs/operators';
import { ThirdPartyCodesService } from '../shared/third-party-codes.service';




@Component({
  selector: 'app-third-party-codes-edit',
  templateUrl: './third-party-codes-edit.component.html',
  styleUrls: ['./third-party-codes-edit.component.scss'],
  providers: []
})

export class ThirdPartyCodesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedThirdPartyCodes: ThirdPartyCodes;
  thirdPartyCodesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedThirdPartyCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<ThirdPartyCodesEditComponent>,
    public thirdPartyCodesService: ThirdPartyCodesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThirdPartyCodes = new ThirdPartyCodes();
    this.selectedThirdPartyCodes = this.selectedThirdPartyCodesDialog.data || this.selectedThirdPartyCodes;

    

    this.thirdPartyCodesForm = this.formBuilder.group({
      
  id : [this.selectedThirdPartyCodes.id],
  code : [this.selectedThirdPartyCodes.code, [ ]],
  name : [this.selectedThirdPartyCodes.name, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.thirdPartyCodesService.update(this.thirdPartyCodesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.thirdPartyCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.thirdPartyCodesForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
