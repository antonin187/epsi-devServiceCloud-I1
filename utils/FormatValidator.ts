import { MongoConfigService } from "../services/MongoConfigServices";

// Utilitaire de validation des formats JSON pour les inserts en BDD
export const FormatValidator = {
  hasAllGoodProperties: (objectToValid: object, collectionName: string) => {
    switch (collectionName) {
      case MongoConfigService.collections.movies:
        for (const i in MovieFormat) {
          if (!objectToValid.hasOwnProperty(i)) {
            return false;
          }
        }
        return true;

      case MongoConfigService.collections.comments:
        for (const i in CommentFormat) {
          if (!objectToValid.hasOwnProperty(i)) {
            return false;
          }
        }
        return true;
    }
  },
};


// Format JSON de référence pour un film
const MovieFormat = {
  plot: "test",
  genres: ["Animation", "Short", "Comedy"],
  runtime: 7,
  cast: ["Winsor McCay"],
  num_mflix_comments: 0,
  poster:
    "https://m.media-amazon.com/images/M/MV5BYzg2NjNhNTctMjUxMi00ZWU4LWI3ZjYtNTI0NTQxNThjZTk2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SY1000_SX677_AL_.jpg",
  title:
    "Winsor McCay, the Famous Cartoonist of the N.Y. Herald and His Moving Comics",
  fullplot:
    "Cartoonist Winsor McCay agrees to create a large set of drawings...",
  languages: ["English"],
  released: {
    $date: {
      $numberLong: "-1853539200000",
    },
  },
  directors: ["Winsor McCay", "J. Stuart Blackton"],
  writers: [
    'Winsor McCay (comic strip "Little Nemo in Slumberland")',
    "Winsor McCay (screenplay)",
  ],
  awards: {
    wins: 1,
    nominations: 0,
    text: "1 win.",
  },
  lastupdated: "2015-08-29 01:09:03.030000000",
  year: 1911,
  imdb: {
    rating: 7.3,
    votes: 1034,
    id: 1737,
  },
  countries: ["USA"],
  type: "movie",
  tomatoes: {
    viewer: {
      rating: 3.4,
      numReviews: 89,
      meter: 47,
    },
  },
};


// Format JSON de référence pour un commentaire
const CommentFormat = {
  name: "test",
  email: "test",
  movie_id: "test",
  text: "test",
  date: "2000-01-01T00:00:00.000Z",
};
