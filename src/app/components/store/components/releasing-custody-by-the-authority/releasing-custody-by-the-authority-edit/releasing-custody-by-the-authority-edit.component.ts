
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReleasingCustodyByTheAuthority } from 'app/shared/models/releasing-custody-by-the-authority';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ReleasingCustodyByTheAuthorityService } from '../shared/releasing-custody-by-the-authority.service';




@Component({
  selector: 'app-releasing-custody-by-the-authority-edit',
  templateUrl: './releasing-custody-by-the-authority-edit.component.html',
  styleUrls: ['./releasing-custody-by-the-authority-edit.component.scss'],
  providers: []
})

export class ReleasingCustodyByTheAuthorityEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReleasingCustodyByTheAuthority: ReleasingCustodyByTheAuthority;
  releasingCustodyByTheAuthorityForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private powerTypesService: LookupService;
private powerCodesService: LookupService;

  
authorityTypeSelectOptions: MaterialSelectOptions;
authorityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('authorityType', { static: true }) AuthorityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('authorityCode', { static: true }) AuthorityCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedReleasingCustodyByTheAuthorityDialog: any,
    @Optional() public dialogRef: MatDialogRef<ReleasingCustodyByTheAuthorityEditComponent>,
    public releasingCustodyByTheAuthorityService: ReleasingCustodyByTheAuthorityService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReleasingCustodyByTheAuthority = new ReleasingCustodyByTheAuthority();
    this.selectedReleasingCustodyByTheAuthority = this.selectedReleasingCustodyByTheAuthorityDialog.data || this.selectedReleasingCustodyByTheAuthority;

    
	this.authorityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.powerTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع السلطة  ',
	});

	this.authorityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.powerCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السلطة',
	});


    this.releasingCustodyByTheAuthorityForm = this.formBuilder.group({
      
  id : [this.selectedReleasingCustodyByTheAuthority.id],
  employeeCode : [this.selectedReleasingCustodyByTheAuthority.employeeCode, [ Validators.required ]],
  itemNo : [this.selectedReleasingCustodyByTheAuthority.itemNo, [ Validators.required ]],
  itemCondition : [this.selectedReleasingCustodyByTheAuthority.itemCondition, [ ]],
  lastPrice : [this.selectedReleasingCustodyByTheAuthority.lastPrice, [ ]],
  storeNumber : [this.selectedReleasingCustodyByTheAuthority.storeNumber, [ ]],
  exchangeAuthorizationNumber : [this.selectedReleasingCustodyByTheAuthority.exchangeAuthorizationNumber, [ ]],
  exchangeDate : [this.selectedReleasingCustodyByTheAuthority.exchangeDate, [ ]],
  quantity : [this.selectedReleasingCustodyByTheAuthority.quantity, [ ]],
  projectionDate : [this.selectedReleasingCustodyByTheAuthority.projectionDate, [ Validators.required ]],
  quantityRaised : [this.selectedReleasingCustodyByTheAuthority.quantityRaised, [ Validators.required ]],
  authorityType : [this.selectedReleasingCustodyByTheAuthority.authorityType, [ Validators.required ]],
  authorityCode : [this.selectedReleasingCustodyByTheAuthority.authorityCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.releasingCustodyByTheAuthorityService.update(this.releasingCustodyByTheAuthorityForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.releasingCustodyByTheAuthorityService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.releasingCustodyByTheAuthorityForm.get(name);
  }

  initializeLookupServices() {
    this.powerTypesService = new LookupService('powertypes', this.http);
this.powerCodesService = new LookupService('powercodes', this.http);
  }
}
