/**
 * Interface to verify that a returned post actually is a post
 */
interface IPost {
  id: number;
  title: string;
  username: string;
  description: string;
  community: string;
  url: string;
}

/**
 * Calls to the methods that will return the data
 */
export class Resolvers {
  // The mocked posts data
  private postsData: [IPost];
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
      Query: {
        // Return a post if it's id matches the one queried for
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
