package com.connect.acts.ActsConnectBackend.service;

import com.connect.acts.ActsConnectBackend.dto.PostDTO;
import com.connect.acts.ActsConnectBackend.dto.PostRequestDTO;
import com.connect.acts.ActsConnectBackend.model.Post;
import com.connect.acts.ActsConnectBackend.model.User;
import com.connect.acts.ActsConnectBackend.repo.PostRepo;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostService {
  private final PostRepo postRepo;

  private final UserService userService;

  public PostService(PostRepo postRepo, UserService userService) {
    this.postRepo = postRepo;
    this.userService = userService;
  }

  public List<PostDTO> getPosts(User user) {
    Set<User> followingUsers = userService.getFollowing(user); // Get the users the logged-in user is following
    long followingCount = followingUsers.size();

    List<PostDTO> posts;
    if (followingCount < 3) {
      posts = postRepo.findCombinedPosts(followingUsers);
    } else {
      posts = postRepo.findRecentPosts(followingUsers);
    }

    // Populate likedByRequser flag and likedByUsers list
    for (PostDTO postDTO : posts) {
        Optional<Post> postOpt = postRepo.findById(postDTO.getId());
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            Set<User> likedUsers = post.getLikedByUsers();
            if (likedUsers != null) {
                postDTO.setLikedByUsers(likedUsers.stream().map(User::getId).collect(Collectors.toList()));
                postDTO.setLikedByRequser(likedUsers.contains(user));
            } else {
                postDTO.setLikedByUsers(new ArrayList<>());
                postDTO.setLikedByRequser(false);
            }
        }
    }

    return posts;
  }

  public PostDTO createPost(User user, PostRequestDTO postRequestDTO) {
    if (user == null) {
      throw new IllegalArgumentException("User cannot be null");
    }
    if (postRequestDTO == null || postRequestDTO.getTitle() == null || postRequestDTO.getTitle().trim().isEmpty()) {
      throw new IllegalArgumentException("Post title cannot be empty");
    }
    Post post = new Post();
    post.setTitle(postRequestDTO.getTitle());
    post.setContent(postRequestDTO.getContent());
    post.setUser(user);
    post.setDummy(false);
    postRepo.save(post);
    return new PostDTO(post.getId(), post.getTitle(), post.getContent(), post.isDummy(), post.getCreatedAt(), post.getUpdatedAt(), post.getUser().getId(), post.getUser().getName());
  }

  public Post findById(UUID postId) {
    if (postId == null) {
      throw new IllegalArgumentException("Post ID cannot be null");
    }
    return postRepo.findById(postId).orElse(null);
  }

  public PostDTO editPost(User user, UUID postId, PostRequestDTO postRequestDTO) {
    if (user == null || postId == null || postRequestDTO == null) {
      return null;
    }
    Optional<Post> postOptional = postRepo.findById(postId);
    if (postOptional.isPresent()) {
      Post post = postOptional.get();
      if (post.getUser().equals(user)) {
        post.setTitle(postRequestDTO.getTitle());
        post.setContent(postRequestDTO.getContent());
        post = postRepo.save(post);
        return new PostDTO(post.getId(), post.getTitle(), post.getContent(), post.isDummy(), post.getCreatedAt(), post.getUpdatedAt(), post.getUser().getId(), post.getUser().getName());
      }
    }
    return null;
  }


  public PostDTO likePost(User user, UUID postId) {
    if (user == null || postId == null) {
      throw new IllegalArgumentException("User and Post ID cannot be null");
    }

    Optional<Post> postOptional = postRepo.findById(postId);
    if (postOptional.isPresent()) {
      Post post = postOptional.get();
      Set<User> likedByUsers = post.getLikedByUsers();
      if (likedByUsers == null) {
        likedByUsers = new HashSet<>();
        post.setLikedByUsers(likedByUsers);
      }

      if (!likedByUsers.contains(user)) {
        likedByUsers.add(user);
      } else {
        likedByUsers.remove(user);
      }

      post = postRepo.save(post);
      PostDTO dto = new PostDTO(post.getId(), post.getTitle(), post.getContent(), post.isDummy(), post.getCreatedAt(), post.getUpdatedAt(), post.getUser().getId(), post.getUser().getName());
      dto.setLikedByUsers(post.getLikedByUsers().stream().map(User::getId).collect(Collectors.toList()));
      dto.setLikedByRequser(post.getLikedByUsers().contains(user));
      return dto;
    }
    return null;
  }

  public boolean deletePost(User user, UUID postId) {
    if (user == null || postId == null) {
      return false;
    }
    Optional<Post> postOptional = postRepo.findById(postId);
    if (postOptional.isPresent()) {
      Post post = postOptional.get();
      if (post.getUser().equals(user)) {
        postRepo.delete(post);
        return true;
      }
    }
    return false;
  }



  public PostDTO likePost(User user, UUID postId) {
    if (user == null || postId == null) {
      return null;
    }
    Optional<Post> postOptional = postRepo.findById(postId);
    if (postOptional.isPresent()) {
      Post post = postOptional.get();
      if (!post.getLikedByUsers().contains(user)) {
        post.getLikedByUsers().add(user);
      } else {
        post.getLikedByUsers().remove(user);
      }
      post = postRepo.save(post);
      return new PostDTO(post.getId(), post.getTitle(), post.getContent(), post.isDummy(), post.getCreatedAt(), post.getUpdatedAt(), post.getUser().getId(), post.getUser().getName());
    }
    return null;
  }

}
