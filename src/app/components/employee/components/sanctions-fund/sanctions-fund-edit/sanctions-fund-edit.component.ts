
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SanctionsFund } from 'app/shared/models/sanctions-fund';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { SanctionsFundService } from '../shared/sanctions-fund.service';




@Component({
  selector: 'app-sanctions-fund-edit',
  templateUrl: './sanctions-fund-edit.component.html',
  styleUrls: ['./sanctions-fund-edit.component.scss'],
  providers: []
})

export class SanctionsFundEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSanctionsFund: SanctionsFund;
  sanctionsFundForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private deathCodesService: LookupService;

  
deathCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('deathCode', { static: true }) DeathCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSanctionsFundDialog: any,
    @Optional() public dialogRef: MatDialogRef<SanctionsFundEditComponent>,
    public sanctionsFundService: SanctionsFundService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSanctionsFund = new SanctionsFund();
    this.selectedSanctionsFund = this.selectedSanctionsFundDialog.data || this.selectedSanctionsFund;

    
	this.deathCodeSelectOptions = new MaterialSelectOptions({
	 data: this.deathCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود منحة الوفاة',
	});


    this.sanctionsFundForm = this.formBuilder.group({
      
  id : [this.selectedSanctionsFund.id],
  employeeCode : [this.selectedSanctionsFund.employeeCode, [ Validators.required ]],
  demandDate : [this.selectedSanctionsFund.demandDate, [ Validators.required ]],
  deathDate : [this.selectedSanctionsFund.deathDate, [ Validators.required ]],
  amount : [this.selectedSanctionsFund.amount, [ Validators.required ]],
  dietName : [this.selectedSanctionsFund.dietName, [ Validators.required ]],
  receiverName : [this.selectedSanctionsFund.receiverName, [ Validators.required ]],
  deathCode : [this.selectedSanctionsFund.deathCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.sanctionsFundService.update(this.sanctionsFundForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.sanctionsFundService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.sanctionsFundForm.get(name);
  }

  initializeLookupServices() {
    this.deathCodesService = new LookupService('deathcodes', this.http);
  }
}
