import { withSwagger } from "next-swagger-doc";

const swaggerHandler = withSwagger({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NextJS Swagger",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Movies",
        description: "Operations related to movies"
      },
      {
        name: "Comments",
      },
    ],
    components: {
      schemas: {
        Movie: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "573a1390f29313caabcd4803",
              readOnly: true,
            },
            plot: {
              type: "string",
              example: "test",
            },
            genres: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["Animation", "Short", "Comedy"],
            },
            runtime: {
              type: "integer",
              example: 7,
            },
            cast: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["Winsor McCay"],
            },
            num_mflix_comments: {
              type: "integer",
              example: 0,
            },
            poster: {
              type: "string",
              format: "uri",
              example:
                "https://m.media-amazon.com/images/M/MV5BYzg2NjNhNTctMjUxMi00ZWU4LWI3ZjYtNTI0NTQxNThjZTk2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SY1000_SX677_AL_.jpg",
            },
            title: {
              type: "string",
              example:
                "Winsor McCay, the Famous Cartoonist of the N.Y. Herald and His Moving Comics",
            },
            fullplot: {
              type: "string",
              example:
                "Cartoonist Winsor McCay agrees to create a large set of drawings...",
            },
            languages: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["English"],
            },
            released: {
              type: "object",
              properties: {
                $date: {
                  type: "object",
                  properties: {
                    $numberLong: {
                      type: "string",
                      example: "-1853539200000",
                    },
                  },
                },
              },
            },
            directors: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["Winsor McCay", "J. Stuart Blackton"],
            },
            writers: {
              type: "array",
              items: {
                type: "string",
              },
              example: [
                'Winsor McCay (comic strip "Little Nemo in Slumberland")',
                "Winsor McCay (screenplay)",
              ],
            },
            awards: {
              type: "object",
              properties: {
                wins: {
                  type: "integer",
                  example: 1,
                },
                nominations: {
                  type: "integer",
                  example: 0,
                },
                text: {
                  type: "string",
                  example: "1 win.",
                },
              },
            },
            lastupdated: {
              type: "string",
              example: "2015-08-29 01:09:03.030000000",
            },
            year: {
              type: "integer",
              example: 1911,
            },
            imdb: {
              type: "object",
              properties: {
                rating: {
                  type: "number",
                  example: 7.3,
                },
                votes: {
                  type: "integer",
                  example: 1034,
                },
                id: {
                  type: "integer",
                  example: 1737,
                },
              },
            },
            countries: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["USA"],
            },
            type: {
              type: "string",
              example: "movie",
            },
            tomatoes: {
              type: "object",
              properties: {
                viewer: {
                  type: "object",
                  properties: {
                    rating: {
                      type: "number",
                      example: 3.4,
                    },
                    numReviews: {
                      type: "integer",
                      example: 89,
                    },
                    meter: {
                      type: "integer",
                      example: 47,
                    },
                  },
                  lastUpdated: {
                    type: "object",
                    properties: {
                      $date: {
                        type: "string",
                        format: "date-time",
                        example: "2015-08-20T18:51:24.000Z",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        Comment: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "573a1540f29633cerbcd684",
              readOnly: true,
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "John Doe",
            },
            movie_id: {
              type: "string",
              example: "573a5290f29673cerghd684",
              readOnly: true,
            },
            text: {
              type: "string",
              example: "Here is the synopsis!",
            },
            date: {
              type: "string",
              example: new Date(),
              readOnly: true,
            },
            
          },
        },
      },
      Response: {
        Message200: {
          type: "object",
          properties: {
            status: {
              type: "number",
              example: 400
            },
            data: {
              type: "object",
            },
          }
        },
        Message201: {
          type: "object",
          properties: {
            status: {
              type: "number",
              example: 201
            },
            data: {
              type: "object",
            },
          }
        },
        Message204: {
          type: "object",
          properties: {
            status: {
              type: "number",
              example: 204
            },
            message: {
              type: "string",
              example: "Availability resource deleted."
            },
          }
        },
        Error400: {
          type: "object",
          properties: {
            status: {
              type: "number",
              example: 400
            },
            message: {
              type: "string",
              example: "Bad Request"
            },
            description: {
              type: "string",
              example: "The request cannot be fulfilled due to bad syntax."
            }
          }
        },
        Error404: {
          type: "object",
          properties: {
            status: {
              type: "number",
              example: 404
            },
            message: {
              type: "string",
              example: "Not Found"
            },
            description: {
              type: "string",
              example: "The requested resource could not be found."
            }
          }
        },
        Error500: {
          type: "object",
          properties: {
            status: {
              type: "number",
              example: 500
            },
            message: {
              type: "string",
              example: "Internal Error"
            },
            description: {
              type: "string",
              example: "An unexpected error occurred while processing the request."
            }
          }
        }

      }
    },
  },
  apiFolder: "pages/api",
});

export default swaggerHandler();
