import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-medication',
  templateUrl: './edit-medication.component.html',
  styleUrls: ['./edit-medication.component.scss'],
})
export class EditMedicationComponent implements OnInit {
  formValue!: FormGroup;
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      currentmedication: [''],
      otcmedication: [''],
      herbsmineralandvitamin: [''],
      socialdrug: [''],
      pastprescribedmedication: [''],
      drugallergies: [''],
      reactionother: [''],
    });
  }
}
