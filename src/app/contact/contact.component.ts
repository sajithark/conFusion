import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback , CONTACTTYPE } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  contactType = CONTACTTYPE;
  feedback : Feedback;

  @ViewChild('fform') feedbackFormDirective;

  constructor(private formBuilder : FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.formBuilder.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      telenum : [0, Validators.required],
      email : ['', Validators.required],
      contactType : 'None',
      message : ['', Validators.required],
      agree : false,
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname : '',
      lastname : '',
      telenum : 0,
      email : '',
      contactType : 'None',
      message : '',
      agree : false,
    });
    this.feedbackFormDirective.reset();
  }
}
