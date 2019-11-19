
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ThirdPartyCodes } from 'app/shared/models/third-party-codes';
import { switchMap } from 'rxjs/operators';
import { ThirdPartyCodesService } from '../shared/third-party-codes.service';


@Component({
  selector: 'app-third-party-codes-new',
  templateUrl: './third-party-codes-new.component.html',
  styleUrls: ['./third-party-codes-new.component.scss'],
  providers: [
    ]
})

export class ThirdPartyCodesNewComponent extends AppBaseComponent implements OnInit {
  thirdPartyCodesForm: FormGroup;
  @Input() selectedThirdPartyCodes: ThirdPartyCodes;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ThirdPartyCodesNewComponent>,
    public thirdPartyCodesService: ThirdPartyCodesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThirdPartyCodes = new ThirdPartyCodes();

    

    this.thirdPartyCodesForm = this.formBuilder.group({
     
  id : [0],
  code : [this.selectedThirdPartyCodes.code, [ Validators.required ]],
  name : [this.selectedThirdPartyCodes.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.thirdPartyCodesService.create(this.thirdPartyCodesForm.value)
        .pipe(switchMap(x => {
			return this.thirdPartyCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.thirdPartyCodesForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
