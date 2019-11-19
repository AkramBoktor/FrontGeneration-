import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LookupModel } from 'app/shared/models/controls/lookup.model';
import { LookupService } from '../lookup.service';

@Component({
  selector: 'app-lookup-view',
  templateUrl: './lookup-view.component.html',
  styleUrls: ['./lookup-view.component.scss']
})
export class LookupViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLookup: any;
  @Input() lookupServiceName: string;
  @Input() lookupLabel: string;
  lookupForm: FormGroup;
  instanceService: LookupService;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLookupDialog: any,
    @Optional() public dialogRef: MatDialogRef<LookupViewComponent>) {
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
      code: [{ value: this.selectedLookup.code, disabled: true }, [Validators.required]],
      name: [{ value: this.selectedLookup.name, disabled: true }, [Validators.required]]
    });
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  getControls(name: string) {
    return this.lookupForm.get(name);
  }

}
