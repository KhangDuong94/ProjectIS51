import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface IFilm {
  id: number;
  image: string;
  filmName: string;
  releaseDate: string;
  editMode: boolean;
  review: string;
}

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  filmArray: Array<IFilm> = [];
  disableAddButton = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.filmArray = [
      {
        id: 1,
        image: '../../assets/eraserhead.jpg',
        filmName: 'Eraserhead',
        releaseDate: '1977',
        review: 'My favorite Lynch film.',
        editMode: false
      },
      {
        id: 2,
        image: '../../assets/fightclub.jpg',
        filmName: 'Fight Club',
        releaseDate: '1999',
        review: 'A classic!',
        editMode: false

      },
      {
        id: 3,
        image: '../../assets/submarine.jpg',
        filmName: 'Submarine',
        releaseDate: '2011',
        review: 'Underrated!',
        editMode: false

      }
    ];
  }

  addFilm() {
    this.filmArray.unshift({
      id: null,
      image: null,
      filmName: null,
      releaseDate: null,
      review: null,
      editMode: true
    });
    this.disableAddButton = true;
  }

  removeFilm(index: number) {
    this.filmArray.splice(index, 1);
  }

  clear() {
    this.filmArray = [];
  }

  saveFilm() {
    this.filmArray[0].editMode = false;
    this.disableAddButton = false;

    this.sort('asc');
  }

  addImage() {

  }

  sort(direction: string) {

    this.filmArray.sort((a: IFilm, b: IFilm) => {
      return a.id < b.id ? -1 : 1;
      //   if (a.id > b.id) {
      //     if (direction === 'asc') {
      //       return -1;
      //     } else {
      //       return 1;
      //     }
      //   } else {
      //     if (direction === 'asc') {
      //       return 1;
      //     } else {
      //       return -1;
      //     }
      //   }
      // });
    });
  }

  previousSlide() {
    console.log('works');
  }


}
