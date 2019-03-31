import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators'; 
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  showDish: Dish;
  dishIds : string[];
  prev : string;
  next : string;

  commentForm : FormGroup;
  comment_obj : Comment;

  errorMessage : string;  

  formError = {
    'author' : '',
    'comment' : '',
  };

  validationMessages = {
    'author' : {
      'required' : 'Author name is required',
      'minlength' : 'Author name should be atleast 2 characters long',
      'maxlength' : 'Author name cannot be more than 25 characters long',
    },
    'comment' : {
      'required' : 'Comment is required',
    },
  };

  @ViewChild('fform') commentFormDirective;
    
  constructor(private dishService: DishService, 
              private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              @Inject('BaseURL') private BaseURL) { 
    this.createForm();
  }

  ngOnInit() {
    // let id = this.route.snapshot.params['id'];
    // this.dishService.getDish(id)
    // .subscribe(showDish => this.showDish = showDish);
    this.dishService.getDishIds().
      subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(showDish => {
          this.showDish = showDish;
          this.setPrevNext(showDish.id);},
      errorMessage => this.errorMessage = <any>errorMessage
    );
  }

  setPrevNext(dishId : string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      author : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment : ['', Validators.required],
      rating : 5,
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // reset validation messages  
  }

  onValueChanged(data ?: any) {
    if(!this.commentForm)
      return;
    const form = this.commentForm;
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
    this.comment_obj = this.commentForm.value;
    this.comment_obj.date = new Date().toISOString();
    this.showDish.comments.push(this.comment_obj);
    console.log(this.comment_obj);
    this.commentForm.reset({
      author : '',
      comment : '',
      rating : 5,
    });
    this.commentFormDirective.reset();
  }
}