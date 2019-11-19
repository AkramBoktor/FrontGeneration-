
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Organization } from 'app/shared/models/organization';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { OrganizationService } from '../shared/organization.service';




@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss'],
  providers: []
})

export class OrganizationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedOrganization: Organization;
  organizationForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedOrganizationDialog: any,
    @Optional() public dialogRef: MatDialogRef<OrganizationEditComponent>,
    public organizationService: OrganizationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOrganization = new Organization();
    this.selectedOrganization = this.selectedOrganizationDialog.data || this.selectedOrganization;

    
	this.sectorSelectOptions = new MaterialSelectOptions({
	 data: this.sectorCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القطاع',
	});


    this.organizationForm = this.formBuilder.group({
      
  id : [this.selectedOrganization.id],
  organizationNumber : [this.selectedOrganization.organizationNumber, [ Validators.required,Validators.minLength(1) ]],
  organizationName : [this.selectedOrganization.organizationName, [ Validators.required ]],
  sector : [this.selectedOrganization.sector, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.organizationService.update(this.organizationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.organizationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.organizationForm.get(name);
  }

  initializeLookupServices() {
    this.sectorCodesService = new LookupService('sectorcodes', this.http);
  }
}
