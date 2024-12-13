package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Carrier;
import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.model.Comment;
import dev.group21.rescmeal.model.Purchase;
import dev.group21.rescmeal.services.CarrierService;
import dev.group21.rescmeal.services.ClientService;
import dev.group21.rescmeal.services.CommentService;
import dev.group21.rescmeal.services.PurchaseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://10.0.2.2:3000"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private ClientService clientService;
    @Autowired
    private CarrierService carrierService;
    @Autowired
    private PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@Valid @RequestBody Map<String, Object> payload) {
        Long clientId = Long.valueOf((Integer) payload.get("clientId"));
        Long carrierId = Long.valueOf((Integer) payload.get("carrierId"));
        Long purchaseId = Long.valueOf((Integer) payload.get("purchaseId"));
        String description = (String) payload.get("description");

        Optional<Client> client = clientService.getClientById(clientId);
        Optional<Carrier> carrier = carrierService.getCarrierById(carrierId);
        Optional<Purchase> purchase = purchaseService.getPurchaseById(purchaseId);

        if (client.isPresent() && carrier.isPresent() && purchase.isPresent()) {
            Comment comment = new Comment();
            comment.setClient(client.get());
            comment.setCarrier(carrier.get());
            comment.setPurchase(purchase.get());
            comment.setDescription(description);

            Comment newComment = commentService.saveComment(comment);
            return ResponseEntity.ok(newComment);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/list")
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Optional<Comment> comment = commentService.getCommentById(id);
        return comment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment commentDetails) {
        Optional<Comment> optionalComment = commentService.getCommentById(id);
        if (optionalComment.isPresent()) {
            Comment updatedComment = optionalComment.get();
            updatedComment.setClient(commentDetails.getClient());
            updatedComment.setCarrier(commentDetails.getCarrier());
            updatedComment.setPurchase(commentDetails.getPurchase());
            updatedComment.setDescription(commentDetails.getDescription());
            commentService.saveComment(updatedComment);
            return ResponseEntity.ok(updatedComment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        try {
            commentService.deleteComment(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @GetMapping("/last/{clientId}")
    public ResponseEntity<Comment> getLastCommentByClientId(@PathVariable Long clientId) {
        List<Comment> comments = commentService.getCommentsByClientId(clientId);
        if (!comments.isEmpty()) {
            Comment lastComment = comments.get(comments.size() - 1);
            return ResponseEntity.ok(lastComment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/commentsCarrier/{carrierId}")
    public ResponseEntity<PagedModel<EntityModel<Comment>>> getCommentsByCarrierId(@PathVariable Long carrierId, Pageable pageable, PagedResourcesAssembler<Comment> assembler) {
        try {
            Page<Comment> commentPage = commentService.getCarrierComments(carrierId, pageable);
            if (commentPage.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(assembler.toModel(commentPage));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    private HttpHeaders errorHeader(Exception e) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Error-Message", e.getMessage());
        return headers;
    }
}
