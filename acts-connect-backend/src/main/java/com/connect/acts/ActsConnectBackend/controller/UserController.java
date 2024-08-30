package com.connect.acts.ActsConnectBackend.controller;

import com.connect.acts.ActsConnectBackend.dto.*;
import com.connect.acts.ActsConnectBackend.model.Post;
import com.connect.acts.ActsConnectBackend.model.User;
import com.connect.acts.ActsConnectBackend.service.CommentService;
import com.connect.acts.ActsConnectBackend.service.PostService;
import com.connect.acts.ActsConnectBackend.service.UserService;
import com.connect.acts.ActsConnectBackend.utils.JwtUtil;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@Async
public class UserController {
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final PostService postService;
    private final CommentService commentService;

    public UserController(JwtUtil jwtUtil, UserService userService, PostService postService, CommentService commentService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.postService = postService;
        this.commentService = commentService;
    }

    @GetMapping("/posts")
    public CompletableFuture<ResponseEntity<PostResponse>> getPosts(@RequestHeader("Authorization") String token) {
        return CompletableFuture.supplyAsync(() -> {
            String finalToken = token;
            if (finalToken.startsWith("Bearer ")) {
                finalToken = finalToken.substring(7);
            }
            String email = jwtUtil.extractEmail(finalToken);
            User user = userService.findByEmail(email);
            if (user == null) {
                throw new RuntimeException("User not found");
            }
            List<PostDTO> posts = postService.getPosts(user);
            PostResponse postResponse = new PostResponse(200, posts);
            return ResponseEntity.ok(postResponse);
        });
    }

    @PostMapping("/post/create")
    public CompletableFuture<ResponseEntity<PostDTO>> createPost(@RequestHeader("Authorization") String token, @RequestBody PostRequestDTO postRequestDTO) {
        return CompletableFuture.supplyAsync(() -> {
            String finalToken = token;
            if (finalToken.startsWith("Bearer ")) {
                finalToken = finalToken.substring(7);
            }
            String email = jwtUtil.extractEmail(token);
            User user = userService.findByEmail(email);
            PostDTO post = postService.createPost(user, postRequestDTO);
            return ResponseEntity.ok(post);
        });
    }

    @PostMapping("/post/edit/{postId}")
    public CompletableFuture<ResponseEntity<String>> editPost(@RequestHeader("Authorization") String token, @PathVariable UUID postId, @RequestBody PostRequestDTO postRequestDTO) {
        return CompletableFuture.supplyAsync(() -> {
            String email = extractEmailFromToken(token);
            User user = userService.findByEmail(email);
            PostDTO updatedPost = postService.editPost(user, postId, postRequestDTO);
            if (updatedPost == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok("Successfully Edited!");
        });
    }

    @DeleteMapping("/post/delete/{postId}")
    public CompletableFuture<ResponseEntity<String>> deletePost(@RequestHeader("Authorization") String token, @PathVariable UUID postId) {
        return CompletableFuture.supplyAsync(() -> {
            String email = extractEmailFromToken(token);
            User user = userService.findByEmail(email);
            boolean deleted = postService.deletePost(user, postId);
            if (!deleted) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok("Post deleted successfully.");
        });
    }

    @PostMapping("/follow/{userId}")
    public CompletableFuture<ResponseEntity<String>> followUser(@RequestHeader("Authorization") String token, @PathVariable UUID userId) {
        return CompletableFuture.supplyAsync(() -> {
            String email = extractEmailFromToken(token);
            User loggedInUser = userService.findByEmail(email);
            User userToFollow = userService.findById(userId);

            if (userToFollow == null) {
                return ResponseEntity.badRequest().body("User not found.");
            } else if (userToFollow.equals(loggedInUser)) {
                return ResponseEntity.badRequest().body("You cannot follow yourself.");
            } else if (loggedInUser.getFollowing().contains(userToFollow)) {
                return ResponseEntity.badRequest().body("You are already following this user.");
            }

            userService.followUser(loggedInUser, userToFollow);
            return ResponseEntity.ok("Successfully followed the user.");
        });
    }

    @PostMapping("/unfollow/{userId}")
    public CompletableFuture<ResponseEntity<String>> unfollowUser(@RequestHeader("Authorization") String token, @PathVariable UUID userId) {
        return CompletableFuture.supplyAsync(() -> {
            String email = extractEmailFromToken(token);
            User loggedInUser = userService.findByEmail(email);
            User userToUnfollow = userService.findById(userId);

            if (userToUnfollow == null) {
                return ResponseEntity.badRequest().body("User not found.");
            }

            if (!loggedInUser.getFollowing().contains(userToUnfollow)) {
                return ResponseEntity.badRequest().body("User is not in your following list.");
            }

            userService.unfollowUser(loggedInUser, userToUnfollow);
            return ResponseEntity.ok("Successfully unfollowed the user.");
        });
    }

    @PostMapping("/comment/create")
    public CompletableFuture<ResponseEntity<CommentResponse>> createComment(@RequestHeader("Authorization") String token, @RequestBody @Valid CommentRequest commentRequest) {
        return CompletableFuture.supplyAsync(() -> {
            String email = extractEmailFromToken(token);
            User user = userService.findByEmail(email);
            Post post = postService.findById(commentRequest.getPostId());

            if (user == null || post == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            CommentResponse commentResponse = commentService.createComment(user, post, commentRequest);
            return new ResponseEntity<>(commentResponse, HttpStatus.CREATED);
        });
    }

    @PostMapping("/search")
    public CompletableFuture<ResponseEntity<List<UUID>>> searchUsers(@RequestHeader("Authorization") String token, @RequestBody UserSearchRequest searchRequest) {
        return CompletableFuture.supplyAsync(() -> {
            String email = extractEmailFromToken(token);
            User loggedInUser = userService.findByEmail(email);

            if (loggedInUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            List<User> users = userService.searchUsers(searchRequest);
            List<UUID> userIds = users.stream().map(User::getId).collect(Collectors.toList());

            return new ResponseEntity<>(userIds, HttpStatus.OK);
        });
    }

    @GetMapping("/{id}")
    public CompletableFuture<ResponseEntity<UserResponseDTO>> getUser(@PathVariable UUID id) {
        return CompletableFuture.supplyAsync(() -> {
            User user = userService.findById(id);

            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            UserResponseDTO userResponseDTO = new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCompany(),
                user.getCourseType(),
                user.getBatchYear()
            );

            return ResponseEntity.ok(userResponseDTO);
        });
    }

    private String extractEmailFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return jwtUtil.extractEmail(token);
    }
}
