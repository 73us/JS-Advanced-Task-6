import { Injectable } from '@angular/core';
import { IBlog } from '../../interfaces/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogs: IBlog[] = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First post',
      date: new Date(2023, 7, 30, 12, 35, 0),
      message: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam corporis non quis.
      Porro laborum, aliquid in molestias quis blanditiis sint minus magnam sapiente architecto error iste
      veritatis veniam vel officia? Aliquam nobis sunt omnis deserunt ea asperiores, tempore, praesentium
      maiores assumenda quam vero illo esse dolore saepe minima incidunt laborum, quasi doloribus!`,
    }
  ];

  getBlogs(): IBlog[] {
    return this.blogs;
  }

  addBlog(blog: IBlog): void {
    this.blogs.push(blog);
  }
  updateBlog(blog: IBlog, id: number): void {
    const index = this.blogs.findIndex((blog) => blog.id === id);
    this.blogs.splice(index, 1, blog);
  }
  deleteBlog(id: number): void {
    const index = this.blogs.findIndex((blog) => blog.id === id);
    this.blogs.splice(index, 1);
  }
}
