import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback , CONTACTTYPE } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animations';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [flyInOut(), expand()]
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  contactType = CONTACTTYPE;
  feedback : Feedback;
  errorMessage : string;
  feedbackCopy : Feedback;
  spinner : boolean;

  formError = {
    'firstname' : '',
    'lastname' : '',
    'telenum' : '',
    'email' : '',
  };

  validationMessages = {
    'firstname' : {
      'required' : 'First name is required',
      'minlength' : 'First name should be atleast 2 characters long',
      'maxlength' : 'First name cannot be more than 25 characters long'
    },
    'lastname' : {
      'required' : 'Last name is required',
      'minlength' : 'Last name should be atleast 2 characters long',
      'maxlength' : 'Last name cannot be more than 25 characters long'
    },
    'telenum' : {
      'required' : 'Telephone number is required',
      'pattern' : 'Telephone number should contain only numbers'
    },
    'email' : {
      'required' : 'Email ID is required',
      'email' : 'Invalid email ID format'
    },
  };

  @ViewChild('fform') feedbackFormDirective;

  constructor(private formBuilder : FormBuilder,
              private feedbackService : FeedbackService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.formBuilder.group({
      firstname : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telenum : [0, [Validators.required, Validators.pattern]],
      email : ['', [Validators.required, Validators.email]],
      contactType : 'None',
      message : ['', Validators.required],
      agree : false,
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // reset validation messages  
  }

  onValueChanged(data ?: any) {
    if(!this.feedbackForm)
      return;
    const form = this.feedbackForm;
    for(const field in this.formError){
      if(this.formError.hasOwnProperty(field)){
        // clear previous error messages
        this.formError[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const message = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formError[field] += message[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.spinner = true;
    this.feedbackCopy = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedbackCopy)
      .subscribe(feedback => {
        setTimeout(() => {
          this.feedback = feedback;
          this.spinner = false;
          console.log(this.feedback); 
          setTimeout(() => 
          this.feedback = null, 5000);
        }, 1000);
      }
    );

    this.feedbackForm.reset({
      firstname : '',
      lastname : '',
      telenum : 0,
      email : '',
      contactType : 'None',
      message : '',
      agree : false,
    });
    this.feedbackFormDirective.resetForm();
  }
}
