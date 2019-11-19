import { Component, OnInit, Injector, Optional, Inject, Input, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ODataServiceFactory } from 'angular-odata-es5';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LookupModel } from 'app/shared/models/controls/lookup.model';
import { FormGroup, Validators } from '@angular/forms';
import { LookupService } from '../lookup.service';

@Component({
  selector: 'app-lookup-edit',
  templateUrl: './lookup-edit.component.html',
  styleUrls: ['./lookup-edit.component.scss']
})
export class LookupEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLookup: any;
  @Input() lookupServiceName: string;
  @Input() lookupLabel: string;
  lookupForm: FormGroup;
  instanceService: LookupService;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLookupDialog: any,
    @Optional() public dialogRef: MatDialogRef<LookupEditComponent>) {
    super(injector);
  }

  ngOnInit() {
    // Check Inputs from route data
    this.selectedLookup = this.selectedLookupDialog.data || new LookupModel();
    const lookupService = this.activatedRoute.snapshot.data.lookupServiceName;
    const lookupLabel = this.activatedRoute.snapshot.data.lookupLabel;
    if (lookupService) {
      this.lookupServiceName = lookupService;
      this.lookupLabel = lookupLabel;
    } else {
      this.lookupServiceName = this.selectedLookup.lookupServiceName;
      this.lookupLabel = this.selectedLookup.lookupLabel;
    }
    // ----
    this.instanceService = new LookupService(this.lookupServiceName, this.http);
    this.lookupForm = this.formBuilder.group({
      id: [this.selectedLookup.id],
      code: [this.selectedLookup.code, [Validators.required]],
      name: [this.selectedLookup.name, [Validators.required]]
    });
  }

  onSubmit() {
    this.instanceService.update(this.lookupForm.value, this.lookupForm.get('id').value).subscribe(
      (result) => {
        if (this.dialogRef) {
          this.dialogRef.close(true);
        } else {
          this.onBack();
        }
      });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  getControls(name: string) {
    return this.lookupForm.get(name);
  }

}
