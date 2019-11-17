
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SanctionsFund } from 'app/shared/models/sanctions-fund';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { SanctionsFundService } from '../shared/sanctions-fund.service';


@Component({
  selector: 'app-sanctions-fund-new',
  templateUrl: './sanctions-fund-new.component.html',
  styleUrls: ['./sanctions-fund-new.component.scss'],
  providers: [
    ]
})

export class SanctionsFundNewComponent extends AppBaseComponent implements OnInit {
  sanctionsFundForm: FormGroup;
  @Input() selectedSanctionsFund: SanctionsFund;
  errorMessages: FormControlError[] = [
        
  ];

  private deathCodesService: LookupService;

  
deathCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('deathCode', { static: true }) DeathCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SanctionsFundNewComponent>,
    public sanctionsFundService: SanctionsFundService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSanctionsFund = new SanctionsFund();

    
	this.deathCodeSelectOptions = new MaterialSelectOptions({
	 data: this.deathCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود منحة الوفاة',
	});


    this.sanctionsFundForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedSanctionsFund.employeeCode, [ Validators.required ]],
  demandDate : [this.selectedSanctionsFund.demandDate, [ Validators.required ]],
  deathDate : [this.selectedSanctionsFund.deathDate, [ Validators.required ]],
  amount : [this.selectedSanctionsFund.amount, [ Validators.required ]],
  dietName : [this.selectedSanctionsFund.dietName, [ ]],
  receiverName : [this.selectedSanctionsFund.receiverName, [ Validators.required ]],
  deathCode : [this.selectedSanctionsFund.deathCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.sanctionsFundService.create(this.sanctionsFundForm.value)
        .pipe(switchMap(x => {
			return this.sanctionsFundService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.sanctionsFundForm.get(name);
    }

  initializeLookupServices() {
    this.deathCodesService = new LookupService('deathcodes', this.http);
  }
 }
