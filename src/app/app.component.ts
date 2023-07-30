import { Component, OnInit } from '@angular/core';
import { IBlog } from './shared/interfaces/blog';
import { IUser } from './shared/interfaces/user';
import { BlogService } from './shared/services/blog/blog.service';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lesson06task';

  public blogs: IBlog[] = [];
  public users: IUser[] = [];

  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) {}

  // modal show/hide start
  public signInForm = false;
  public signUpForm = false;
  public addForm = false;
  public editForm = false;
  public editId!: number;

  signInModal(): void {
    this.signInForm = true;
  }
  signUpModal(): void {
    this.signUpForm = true;
  }
  addPostModal(): void {
    this.addForm = true;
  }
  editPostModal(blog: IBlog): void {
    this.editForm = true;
    this.editForm = true;
    this.editPostTitle = blog.topic;
    this.editPostText = blog.message;
    this.editId = blog.id;
  }
  closeWindow(): void {
    this.signInForm = false;
    this.signUpForm = false;
    this.addForm = false;
    this.editForm = false;
    this.showMessage = false;
  }
  // modal show/hide end

  // sign IN/UP/OUT start
  public isOnline = false;
  public currentUser!: string;
  public userName!: string;
  public userEmail!: string;
  public userPassword!: string;
  public newUserName!: string;
  public newUserEmail!: string;
  public newUserPassword!: string;
  public showMessage = false;

  signIn(): void {
    const users = this.userService.getUsers();
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === this.userEmail &&
        users[i].password === this.userPassword
      ) {
        this.showMessage = false;
        this.currentUser = users[i].userName;
        this.isOnline = true;
        this.closeWindow();
        this.clearInputs();
      } else if (
        (i === users.length - 1 && users[i].email !== this.userEmail) ||
        (i === users.length - 1 && users[i].password !== this.userPassword)
      ) {
        this.showMessage = true;
        this.clearInputs();
      }
    }
  }
  signUp(): void {
    const users = this.userService.getUsers();
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === this.newUserEmail) {
        this.showMessage = true;
        this.newUserEmail = '';
        break;
      }
      if (i === users.length - 1 && users[i].email !== this.newUserEmail) {
        const newUser: IUser = {
          id: this.users.slice(-1)[0].id + 1,
          userName: this.newUserName,
          email: this.newUserEmail,
          password: this.newUserPassword,
        };
        this.userService.addUser(newUser);
        this.showMessage = false;
        this.currentUser = this.newUserName;
        this.isOnline = true;
        this.closeWindow();
        this.clearInputs();
        break;
      }
    }
  }
  signOut(): void {
    this.currentUser = '';
    this.isOnline = false;
    this.showMessage = false;
  }
  // sign IN/UP/OUT end

  // add new post start
  public postTitle!: string;
  public postText!: string;

  addPost(): void {
    const newPost: IBlog = {
      id: this.blogs.length !== 0 ? this.blogs.slice(-1)[0].id + 1 : 1,
      postedBy: this.currentUser,
      topic: this.postTitle,
      date: new Date(),
      message: this.postText,
    };
    this.blogService.addBlog(newPost);
    this.closeWindow();
    this.clearInputs();
  }
  // add new post end

  // edit post start
  public editPostTitle!: string;
  public editPostText!: string;

  editPost(): void {
    const updatePost: IBlog = {
      id: this.editId,
      postedBy: this.currentUser,
      topic: this.editPostTitle,
      date: new Date(),
      message: this.editPostText,
    };
    this.blogService.updateBlog(updatePost, this.editId);
    this.closeWindow();
    this.clearInputs();
  }
  // edit post end

  deletePost(blog: IBlog): void {
    this.blogService.deleteBlog(blog.id);
  }

  ngOnInit(): void {
    this.getBlogs();
    this.getUsers();
  }

  getBlogs(): void {
    this.blogs = this.blogService.getBlogs();
  }
  getUsers(): void {
    this.users = this.userService.getUsers();
  }
  clearInputs(): void {
    this.userName = '';
    this.userEmail = '';
    this.userPassword = '';
    this.newUserName = '';
    this.newUserEmail = '';
    this.newUserPassword = '';
    this.postTitle = '';
    this.postText = '';
  }
}
