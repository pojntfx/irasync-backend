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
  private users: IUser[];

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
        // Return a post by it's id
        post: (root, { id }): IPost2 => {
          return this.users[0].posts.filter((post) => {
            return post.meta.id === id;
          })[0];
        },
        // {id} is ES6 object deconstruction to get the id from the args object passed in here
        // Return a user by ID
        user: (root, { id, name }): IUser => {
          // ID has been provided, name not
          if (id != null && name == null) {
            // Return the firt user with specified id
            return this.users.filter((user) => {
              return user.meta.id === id;
            })[0];
          // Name has been provided, id not
          } else if (name != null && id == null) {
            // Return the first user with specified name
            return this.users.filter((user) => {
              return user.meta.name === name;
            })[0];
          // Both a name and an ID have been provided
          } else if (name != null && id != null) {
            // Throw error because the provided ID does not have to match the name provided
            throw new Error("Both a name and an id have specified, specifiy only one.");
          // Neither a name nor an ID have been provided
          } else {
            throw new Error("Neither a name nor an id has been specified.");
          }
        },
        // Return a userArray of all users
        users: (): IUser[] => {
          return this.users;
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
    // Mock user data
    // tslint:disable:object-literal-sort-keys REMOVE THIS AFTER PROTOTYPING
    this.users = [{
      meta: {
        id: 0,
        name: "pojntfx",
        firstName: "Felicitas",
        lastName: "Pojtinger",
      },
      posts: [{
        meta: {
          id: 0,
          votes: 8,
        },
        body: {
          title: "A quick test post",
          description: "A quick test description",
        },
        comments: [
          {
            meta: {
              id: 0,
              votes: 16,
            },
            body: {
              title: "A quick test comment",
              description: "A quick comment test description",
            },
          },
        ],
      }],
      communities: [{
        meta: {
          id: 0,
          subs: 32,
          externalMods: [
            {
              meta: {
                id: 1,
                name: "maxmustermann",
                firstName: "Max",
                lastName: "Mustermann",
              },
            },
          ],
        },
      }],
    }];
  }
}

/**
 * A user. Every element that is not a user itself must be owned by a user.
 */
interface IUser {
  // Meta
  meta: IUserMeta;
  // Posts (Optional, in the beginning a user does have no post)
  posts?: IPost2[];
  // Communities (Optional, a user might not have a community)
  communities?: ICommunity[];
}

/**
 * A post. Can be both a community's post or nested post (comment).
 */
interface IPost2 {
  // Meta
  meta: IPostMeta;
  // Content
  body: IPostBody;
  // Comments (A post does not have to have a comment)
  comments?: IPost2[]; // There will only be references to the ObjectIDs here
}

/**
 * A community. Is owned by a user.
 */
interface ICommunity {
  // Meta
  meta: ICommunityMeta;
  // Posts (Optional, a community does not have to have any content)
  posts?: IPost2[];
  // Files (Optional, a community does not have to have any content)
  files?: IFile[];
  // Apps (Optional, a community does not have to have any content)
  apps?: IApp[];
  // Wiki (Optional, a community does not have to have any content)
  wiki?: IPost2[]; // This can be nested into categories with specific names & meta tags
}

interface IApp {
  // TODO: Add app specs (Run arbitrary js code in specified scope)
  id: number; // We will get this from MongoDB's ObjectID
}

interface IFile {
  // TODO: Add file specs (IPFS?)
  id: number; // We will get this from MongoDB's ObjectID
}

interface ICommunityMeta {
  id: number; // We will get this from MongoDB's ObjectID
  subs: number; // No votes here because you should rather judge the content
  externalMods?: IUser[]; // External moderators (optional), will be added by their ObjectID (only 1 can own community)
}

interface IUserMeta {
  id: number; // We will get this from MongoDB's ObjectID
  name: string;
  firstName: string;
  lastName: string;
}

interface IPostMeta {
  id: number; // We will get this from MongoDB's ObjectID
  votes: number;
}

interface IPostBody {
  title: string;
  description: string;
}
