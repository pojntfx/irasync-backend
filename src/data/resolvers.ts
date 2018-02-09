/**
 * Interface to verify that a returned post actually is a post
 */
interface IPost {
  community: string;
  description: string;
  id: number;
  title: string;
  url: string;
  username: string;
}

/**
 * Calls to the methods that will return the data
 */
export class Resolvers {
  // The mocked posts data
  private postsData: IPost[];
  private resolvers: any;

  constructor() {
    // Add the mock data
    this.createPosts();
    // Create the resolvers that return the data
    this.createResolvers();
  }

  /**
   * Create the resolvers
   */
  public createResolvers() {
    this.resolvers = {
      Mutation: {
        // Create a new post
        // Use fancy ES6 object deconstruction syntax for cleaner code, replaces args.arg
        createPost: (root, { community, description, title, url, username }): IPost => {
          // Check whether the non-required arguments have been provided, if not insert
          if (url == null || url === "") {
            url = "url_not_provided";
          }
          if (description == null || description === "") {
            description = "description_not_provided";
          }
          // Assemble the new post
          const newPost = {
            community,
            description,
            id: this.postsData.length,
            title,
            url,
            username,
          };
          // Add the post to the mock data
          this.postsData.push(newPost);
          // Return the newPost to the client
          return newPost;
        },
      },
      Query: {
        // Return a post if it's id matches the one queried for
        // {id} is ES6 object deconstruction to get the id from the args object passed in here
        post: (root, { id }): IPost => {
          return this.postsData.filter((post) => {
            return post.id === id;
          })[0];
        },
        // Return an objectArray of all posts
        posts: (): object[] => {
          return this.postsData;
        },
      },
    };
  }

  /**
   * Set the mock data
   */
  private createPosts() {
    this.postsData = [{
      community: "Trains",
      description: "Great! A train has just passed by!",
      id: 1,
      title: "A train passing by",
      url: "https://train.com",
      username: "pojntfx",
    },
    {
      community: "Trains2",
      description: "Great! A train has just passed by!2",
      id: 2,
      title: "A train passing by2",
      url: "https://train2.com",
      username: "pojntfx2",
    },
    {
      community: "Trains3",
      description: "Great! A train has just passed by!3",
      id: 3,
      title: "A train passing by3",
      url: "https://train3.com",
      username: "pojntfx3",
    }];
  }
}
