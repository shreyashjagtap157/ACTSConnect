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
import javax.validation.Valid;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
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
    public ResponseEntity<ApiResponse<PostResponse>> getPosts(@RequestHeader("Authorization") String token) {
        String email = extractEmailFromToken(token);
        User user = userService.findByEmail(email);
        if (user == null) {
            logger.warn("User not found for email: {}", email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("User not found", null));
        }
        List<PostDTO> posts = postService.getPosts(user);
        PostResponse postResponse = new PostResponse(200, posts);
        return ResponseEntity.ok(ApiResponse.success("Posts fetched", postResponse));
    }

    // Asynchronous version for multithreaded processing
    @Async
    @GetMapping("/posts/async")
    public CompletableFuture<ResponseEntity<ApiResponse<PostResponse>>> getPostsAsync(@RequestHeader("Authorization") String token) {
        return CompletableFuture.completedFuture(getPosts(token));
    }

    @PostMapping("/post/create")
    public ResponseEntity<ApiResponse<PostDTO>> createPost(@RequestHeader("Authorization") String token, @RequestBody @Valid PostRequestDTO postRequestDTO) {
        String email = extractEmailFromToken(token);
        User user = userService.findByEmail(email);
        if (user == null) {
            logger.warn("User not found for email: {}", email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("User not found", null));
        }
        PostDTO post = postService.createPost(user, postRequestDTO);
        return ResponseEntity.ok(ApiResponse.success("Post created", post));
    }

    // Asynchronous version for multithreaded processing
    @Async
    @PostMapping("/post/create/async")
    public CompletableFuture<ResponseEntity<ApiResponse<PostDTO>>> createPostAsync(@RequestHeader("Authorization") String token, @RequestBody @Valid PostRequestDTO postRequestDTO) {
        return CompletableFuture.completedFuture(createPost(token, postRequestDTO));
    }

    @PostMapping("/post/edit/{postId}")
    public ResponseEntity<ApiResponse<String>> editPost(@RequestHeader("Authorization") String token, @PathVariable UUID postId, @RequestBody @Valid PostRequestDTO postRequestDTO) {
        String email = extractEmailFromToken(token);
        User user = userService.findByEmail(email);
        PostDTO updatedPost = postService.editPost(user, postId, postRequestDTO);
        if (updatedPost == null) {
            logger.warn("Post not found for edit: {}", postId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Post not found", null));
        }
        return ResponseEntity.ok(ApiResponse.success("Successfully Edited!", null));
    }

    // Asynchronous version for multithreaded processing
    @Async
    @PostMapping("/post/edit/{postId}/async")
    public CompletableFuture<ResponseEntity<ApiResponse<String>>> editPostAsync(@RequestHeader("Authorization") String token, @PathVariable UUID postId, @RequestBody @Valid PostRequestDTO postRequestDTO) {
        return CompletableFuture.completedFuture(editPost(token, postId, postRequestDTO));
    }

    @DeleteMapping("/post/delete/{postId}")
    public ResponseEntity<ApiResponse<String>> deletePost(@RequestHeader("Authorization") String token, @PathVariable UUID postId) {
        String email = extractEmailFromToken(token);
        User user = userService.findByEmail(email);
        boolean deleted = postService.deletePost(user, postId);
        if (!deleted) {
            logger.warn("Post not found for delete: {}", postId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Post not found", null));
        }
        return ResponseEntity.ok(ApiResponse.success("Post deleted successfully.", null));
    }

    // Asynchronous version for multithreaded processing
    @Async
    @DeleteMapping("/post/delete/{postId}/async")
    public CompletableFuture<ResponseEntity<ApiResponse<String>>> deletePostAsync(@RequestHeader("Authorization") String token, @PathVariable UUID postId) {
        return CompletableFuture.completedFuture(deletePost(token, postId));
    }

    @PostMapping("/follow/{userId}")
    public ResponseEntity<ApiResponse<String>> followUser(@RequestHeader("Authorization") String token, @PathVariable UUID userId) {
        String email = extractEmailFromToken(token);
        User loggedInUser = userService.findByEmail(email);
        User userToFollow = userService.findById(userId);

        if (userToFollow == null) {
            logger.warn("User to follow not found: {}", userId);
            return ResponseEntity.badRequest().body(ApiResponse.error("User not found.", null));
        } else if (userToFollow.equals(loggedInUser)) {
            logger.warn("User tried to follow themselves: {}", userId);
            return ResponseEntity.badRequest().body(ApiResponse.error("You cannot follow yourself.", null));
        } else if (loggedInUser.getFollowing().contains(userToFollow)) {
            logger.warn("User already following: {}", userId);
            return ResponseEntity.badRequest().body(ApiResponse.error("You are already following this user.", null));
        }

        userService.followUser(loggedInUser, userToFollow);
        return ResponseEntity.ok(ApiResponse.success("Successfully followed the user.", null));
    }

    // Asynchronous version for multithreaded processing
    @Async
    @PostMapping("/follow/{userId}/async")
    public CompletableFuture<ResponseEntity<ApiResponse<String>>> followUserAsync(@RequestHeader("Authorization") String token, @PathVariable UUID userId) {
        return CompletableFuture.completedFuture(followUser(token, userId));
    }

    @PostMapping("/unfollow/{userId}")
    public ResponseEntity<ApiResponse<String>> unfollowUser(@RequestHeader("Authorization") String token, @PathVariable UUID userId) {
        String email = extractEmailFromToken(token);
        User loggedInUser = userService.findByEmail(email);
        User userToUnfollow = userService.findById(userId);

        if (userToUnfollow == null) {
            logger.warn("User to unfollow not found: {}", userId);
            return ResponseEntity.badRequest().body(ApiResponse.error("User not found.", null));
        }

        if (!loggedInUser.getFollowing().contains(userToUnfollow)) {
            logger.warn("User not in following list: {}", userId);
            return ResponseEntity.badRequest().body(ApiResponse.error("User is not in your following list.", null));
        }

        userService.unfollowUser(loggedInUser, userToUnfollow);
        return ResponseEntity.ok(ApiResponse.success("Successfully unfollowed the user.", null));
    }

    // Asynchronous version for multithreaded processing
    @Async
    @PostMapping("/unfollow/{userId}/async")
    public CompletableFuture<ResponseEntity<ApiResponse<String>>> unfollowUserAsync(@RequestHeader("Authorization") String token, @PathVariable UUID userId) {
        return CompletableFuture.completedFuture(unfollowUser(token, userId));
    }

    @PostMapping("/comment/create")
    public ResponseEntity<ApiResponse<CommentResponse>> createComment(@RequestHeader("Authorization") String token, @RequestBody @Valid CommentRequest commentRequest) {
        String email = extractEmailFromToken(token);
        User user = userService.findByEmail(email);
        Post post = postService.findById(commentRequest.getPostId());

        if (user == null || post == null) {
            logger.warn("User or post not found for comment. User: {}, Post: {}", email, commentRequest.getPostId());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("User or post not found", null));
        }

        CommentResponse commentResponse = commentService.createComment(user, post, commentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Comment created", commentResponse));
    }

    // Asynchronous version for multithreaded processing
    @Async
    @PostMapping("/comment/create/async")
    public CompletableFuture<ResponseEntity<ApiResponse<CommentResponse>>> createCommentAsync(@RequestHeader("Authorization") String token, @RequestBody @Valid CommentRequest commentRequest) {
        return CompletableFuture.completedFuture(createComment(token, commentRequest));
    }

    @PostMapping("/search")
    public ResponseEntity<ApiResponse<List<UUID>>> searchUsers(@RequestHeader("Authorization") String token, @RequestBody @Valid UserSearchRequest searchRequest) {
        String email = extractEmailFromToken(token);
        User loggedInUser = userService.findByEmail(email);

        if (loggedInUser == null) {
            logger.warn("Logged in user not found for search: {}", email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.error("Unauthorized", null));
        }

        List<User> users = userService.searchUsers(searchRequest);
        List<UUID> userIds = users.stream().map(User::getId).collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("Users found", userIds));
    }

    // Asynchronous version for multithreaded processing
    @Async
    @PostMapping("/search/async")
    public CompletableFuture<ResponseEntity<ApiResponse<List<UUID>>>> searchUsersAsync(@RequestHeader("Authorization") String token, @RequestBody @Valid UserSearchRequest searchRequest) {
        return CompletableFuture.completedFuture(searchUsers(token, searchRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> getUser(@PathVariable UUID id) {
        User user = userService.findById(id);

        if (user == null) {
            logger.warn("User not found for id: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("User not found", null));
        }

        UserResponseDTO userResponseDTO = new UserResponseDTO(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getCompany(),
            user.getCourseType(),
            user.getBatchYear()
        );

        return ResponseEntity.ok(ApiResponse.success("User found", userResponseDTO));
    }

    // Asynchronous version for multithreaded processing
    @Async
    @GetMapping("/{id}/async")
    public CompletableFuture<ResponseEntity<ApiResponse<UserResponseDTO>>> getUserAsync(@PathVariable UUID id) {
        return CompletableFuture.completedFuture(getUser(id));
    }

    private String extractEmailFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return jwtUtil.extractEmail(token);
    }
}
