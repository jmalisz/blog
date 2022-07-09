// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, Router, Route, Set } from '@redwoodjs/router'

import BlogLayout from 'src/layouts/BlogLayout'
import PostsLayout from 'src/layouts/PostsLayout'

import LoginLayout from './layouts/LoginLayout/LoginLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={LoginLayout}>
        <Route name="login" page={LoginPage} path="/login" />
        <Route name="signup" page={SignupPage} path="/signup" />
        <Route name="forgotPassword" page={ForgotPasswordPage} path="/forgot-password" />
        <Route name="resetPassword" page={ResetPasswordPage} path="/reset-password" />
      </Set>
      <Private roles="admin" unauthenticated="home">
        <Set wrap={PostsLayout}>
          <Route name="newPost" page={PostNewPostPage} path="/admin/posts/new" />
          <Route name="editPost" page={PostEditPostPage} path="/admin/posts/{id:Int}/edit" />
          <Route name="post" page={PostPostPage} path="/admin/posts/{id:Int}" />
          <Route name="posts" page={PostPostsPage} path="/admin/posts" />
        </Set>
      </Private>
      <Set wrap={BlogLayout}>
        <Route name="home" page={HomePage} path="/" />
        <Route name="about" page={AboutPage} path="/about" />
        <Route name="article" page={ArticlePage} path="/article/{slug}" />
        <Route name="contact" page={ContactPage} path="/contact" />
      </Set>
      <Route page={NotFoundPage} notfound />
    </Router>
  )
}

export default Routes
