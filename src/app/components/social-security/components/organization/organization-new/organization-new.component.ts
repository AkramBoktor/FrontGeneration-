
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Organization } from 'app/shared/models/organization';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { OrganizationService } from '../shared/organization.service';


@Component({
  selector: 'app-organization-new',
  templateUrl: './organization-new.component.html',
  styleUrls: ['./organization-new.component.scss'],
  providers: [
    ]
})

export class OrganizationNewComponent extends AppBaseComponent implements OnInit {
  organizationForm: FormGroup;
  @Input() selectedOrganization: Organization;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
  ];

  private sectorCodesService: LookupService;

  
sectorSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sector', { static: true }) SectorSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<OrganizationNewComponent>,
    public organizationService: OrganizationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOrganization = new Organization();

    
	this.sectorSelectOptions = new MaterialSelectOptions({
	 data: this.sectorCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القطاع',
	});


    this.organizationForm = this.formBuilder.group({
     
  id : [0],
  organizationNumber : [this.selectedOrganization.organizationNumber, [ Validators.required,Validators.minLength(1) ]],
  organizationName : [this.selectedOrganization.organizationName, [ Validators.required ]],
  sector : [this.selectedOrganization.sector, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.organizationService.create(this.organizationForm.value)
        .pipe(switchMap(x => {
			return this.organizationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.organizationForm.get(name);
    }

  initializeLookupServices() {
    this.sectorCodesService = new LookupService('sectorcodes', this.http);
  }
 }
