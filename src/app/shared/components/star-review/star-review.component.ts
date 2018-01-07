import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StarReviewService } from './star-review.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})
export class StarReviewComponent implements OnInit {
  ratingform: FormGroup;
  @Input() userId;
  @Input() authId;
  stars: Observable<any>;
  avgRating: Observable<any>;
  constructor(private _star: StarReviewService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.stars = this._star.getUserStars(this.userId)
    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    })

    this.ratingform = this.fb.group({
      'review': ['', [
        Validators.required,
        ]
      ],
      'rating': ['', [
        Validators.required
        ]
      ]
     
    },{
      
    });

  }

  starHandler(value) {
    return value;
    //this._star.setStar(this.userId, this.authId, value)
  }
  get review() { return this.ratingform.get('review') }
  get rating() { return this.ratingform.get('rating') }
  save() {
    console.log(this.review.value);
    console.log(this.rating.value);
  }
}
