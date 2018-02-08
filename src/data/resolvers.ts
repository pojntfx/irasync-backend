/**
 * A post type to veryfy that a returned post actually is a post
 */
interface Post {
  id: Number,
  title: String,
  username: String,
  description: String,
  community: String,
  url: String
}

/**
 * Calls to the methods that will return the data
 */
export class Resolvers {
  postsData: any;
  resolvers: any;

  constructor() {
    this.setPosts();
    this.setResolvers();
  }

  /**
   * Set the mock data
   */
  setPosts() {
    this.postsData = [{
      id: 1,
      title: 'A train passing by',
      username: 'pojntfx',
      description: 'Great! A train has just passed by!',
      community: 'Trains',
      url: 'https://train.com'
    },
    {
      id: 2,
      title: 'A train passing by 2',
      username: 'pojntfx2',
      description: 'Great! A train has just passed by!',
      community: 'Trains2',
      url: 'https://train1.com'
    },
    {
      id: 2,
      title: 'A train passing by 3',
      username: 'pojntfx3',
      description: 'Great! A train has just passed by!',
      community: 'Trains3',
      url: 'https://train2.com'
    }]
  }

  /**
   * Create the resolvers
   */
  setResolvers() {
    this.resolvers = {
      Query: {
        // Return a post if it's id matches the one asked for
        post: (root, {id}) => {
          return this.postsData.filter(post => {
            return post.id === id
          })[0]
        },
        // Return an array of all posts
        posts: (): Array<Object> => {
          return this.postsData
        }
      }
    }
  }
}