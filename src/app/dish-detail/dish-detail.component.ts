import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators'; 

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
    
  constructor(private dishService: DishService, 
              private location: Location,
              private route: ActivatedRoute) { }

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
          this.setPrevNext(showDish.id);
    });
  }

  setPrevNext(dishId : string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
