
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReleasingCustodyByTheAuthority } from 'app/shared/models/releasing-custody-by-the-authority';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ReleasingCustodyByTheAuthorityService } from '../shared/releasing-custody-by-the-authority.service';


@Component({
  selector: 'app-releasing-custody-by-the-authority-new',
  templateUrl: './releasing-custody-by-the-authority-new.component.html',
  styleUrls: ['./releasing-custody-by-the-authority-new.component.scss'],
  providers: [
    ]
})

export class ReleasingCustodyByTheAuthorityNewComponent extends AppBaseComponent implements OnInit {
  releasingCustodyByTheAuthorityForm: FormGroup;
  @Input() selectedReleasingCustodyByTheAuthority: ReleasingCustodyByTheAuthority;
  errorMessages: FormControlError[] = [
        
  ];

  private powerTypesService: LookupService;
private powerCodesService: LookupService;
private itemStatusesService: LookupService;

  
authorityTypeSelectOptions: MaterialSelectOptions;
authorityCodeSelectOptions: MaterialSelectOptions;
itemConditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('authorityType', { static: true }) AuthorityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('authorityCode', { static: true }) AuthorityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ReleasingCustodyByTheAuthorityNewComponent>,
    public releasingCustodyByTheAuthorityService: ReleasingCustodyByTheAuthorityService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReleasingCustodyByTheAuthority = new ReleasingCustodyByTheAuthority();

    
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

	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف',
	});


    this.releasingCustodyByTheAuthorityForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedReleasingCustodyByTheAuthority.employeeCode, [ Validators.required ]],
  itemNo : [this.selectedReleasingCustodyByTheAuthority.itemNo, [ Validators.required ]],
  lastPrice : [this.selectedReleasingCustodyByTheAuthority.lastPrice, [ ]],
  storeNumber : [this.selectedReleasingCustodyByTheAuthority.storeNumber, [ ]],
  exchangeAuthorizationNumber : [this.selectedReleasingCustodyByTheAuthority.exchangeAuthorizationNumber, [ ]],
  exchangeDate : [this.selectedReleasingCustodyByTheAuthority.exchangeDate, [ ]],
  quantity : [this.selectedReleasingCustodyByTheAuthority.quantity, [ ]],
  projectionDate : [this.selectedReleasingCustodyByTheAuthority.projectionDate, [ Validators.required ]],
  quantityRaised : [this.selectedReleasingCustodyByTheAuthority.quantityRaised, [ Validators.required ]],
  authorityType : [this.selectedReleasingCustodyByTheAuthority.authorityType, [ Validators.required ]],
  authorityCode : [this.selectedReleasingCustodyByTheAuthority.authorityCode, [ Validators.required ]],
  itemCondition : [this.selectedReleasingCustodyByTheAuthority.itemCondition, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.releasingCustodyByTheAuthorityService.create(this.releasingCustodyByTheAuthorityForm.value)
        .pipe(switchMap(x => {
			return this.releasingCustodyByTheAuthorityService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.releasingCustodyByTheAuthorityForm.get(name);
    }

  initializeLookupServices() {
    this.powerTypesService = new LookupService('powertypes', this.http);
this.powerCodesService = new LookupService('powercodes', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
 }
