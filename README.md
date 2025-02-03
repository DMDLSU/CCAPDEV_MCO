# CCAPDEV = MCO GROUP # 6 - Forum Web Application

## Overview

This is a forum web application, that would be inspired from the layouts/systems of Reddit, Studdit, Communites.Win and traditional forum sites.

The application can either be a general-interest forum or a specialized forum tailored to a specific interest group. Below are the features that maybe implemented for the project. 

These are not final yet, and subject to change as such.

## Features

### 1. View All Posts
- **Recent Posts**: Visitors (unregistered users) can view the 15-20 most recently uploaded post titles along with a description snippet.
- **Pagination/Auto-load**: Visitors can navigate through subsequent sets of posts, either by auto-loading new posts or by paging to another page.
- **Popular Posts**: The most popular post can be displayed, based on a calculated ranking.
- **View Post**: Clicking a post title allows users to view the full post, including comments.

### 2. Register
- **Visitor Registration**: Unregistered visitors must register to post or comment.
  - Required information: username and password.

### 3. View User Profile
- **Profile Page**: Each user has a public profile that includes:
  - Username
  - Profile picture
  - Short description (optional)
  - A portion of the user's latest posts and comments
  - The option to view the user’s complete posts and comments.

### 4. Edit Profile
- **Profile Editing**: Logged-in users can edit their profile.
  - They can modify their profile picture and update their short description.

### 5. Login
- **Login**: Users who have registered can log in.
  - Option to be "remembered" by the website, extending their login period for 3 weeks on each visit.
  
### 6. Logout
- **Logout**: Users can log out from their account.
  - Logging out will clear session data and reset the "remember me" period.

### 7. Post Creation
- **Create a Post**: Logged-in users can create a post by entering a title and body.
  - Additional points are awarded for enabling rich text editing (e.g., markup) without the risk of cross-site scripting (XSS).

### 8. Tags / Communities
- **Categorization**: Posts can be categorized using either tags or communities.
  - **Note**: Only one option (tags or communities) needs to be implemented.

### 9. View a Post
- **Post Details**: Users can view any post they have a link to, which includes:
  - Title
  - Body content
  - Comments

### 10. Commenting
- **Add Comments**: Users can comment on posts, including their own.
- **Replies**: Users can reply to other users' comments, and comments can nest indefinitely.

### 11. Edit / Delete a Post
- **Edit Post**: Post owners can edit their posts at any time.
  - Edited posts should display an indication that they have been modified.
- **Delete Post**: Post owners can delete their posts.

### 12. Edit / Delete a Comment
- **Edit Comment**: Comment owners can edit their comments at any time.
  - Edited comments should display an indication that they have been modified.
- **Delete Comment**: Comment owners can delete their comments.

### 13. Upvote / Downvote
- **Voting**: Users can upvote or downvote posts and comments (including their own).
  - Voting is limited to one vote per post/comment.

### 14. Search
- **Search Function**: Users (and visitors) can search for posts by title or body content.
  - Search results will display posts that match the search query.
  - Users can filter search results by tags or communities.

### 15. General
- **User Experience**: The web application should have a good user experience:
  - Easy navigation
  - Clear and accessible information
  - Cohesive and consistent design that fits the theme of the forum.
