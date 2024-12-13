package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.model.Purchase;
import dev.group21.rescmeal.model.Review;
import dev.group21.rescmeal.services.BusinessService;
import dev.group21.rescmeal.services.ClientService;
import dev.group21.rescmeal.services.PurchaseService;
import dev.group21.rescmeal.services.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://10.0.2.2:3000"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ClientService clientService;
    @Autowired
    private BusinessService businessService;
    @Autowired
    private PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<Review> createReview(@Valid @RequestBody Map<String, Object> payload) {
        Long clientId = Long.valueOf((Integer) payload.get("clientId"));
        Long businessId = Long.valueOf((Integer) payload.get("businessId"));
        Long purchaseId = Long.valueOf((Integer) payload.get("purchaseId"));
        String description = (String) payload.get("description");
        Integer mark = (Integer) payload.get("mark");

        Optional<Client> client = clientService.getClientById(clientId);
        Optional<Business> business = businessService.getBusinessById(businessId);
        Optional<Purchase> purchase = purchaseService.getPurchaseById(purchaseId);

        if (client.isPresent() && business.isPresent() && purchase.isPresent()) {
            Review review = new Review();
            review.setClient(client.get());
            review.setBusiness(business.get());
            review.setPurchase(purchase.get());
            review.setDescription(description);
            review.setMark(mark);
            review.setReview_date(LocalDate.now());

            Review newReview = reviewService.saveReview(review);
            return ResponseEntity.ok(newReview);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/list")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Optional<Review> review = reviewService.getReviewById(id);
        return review.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review reviewDetails) {
        Optional<Review> optionalReview = reviewService.getReviewById(id);
        if (optionalReview.isPresent()) {
            Review updatedReview = optionalReview.get();
            updatedReview.setBusiness(reviewDetails.getBusiness());
            updatedReview.setClient(reviewDetails.getClient());
            updatedReview.setPurchase(reviewDetails.getPurchase());
            updatedReview.setReview_date(reviewDetails.getReview_date());
            updatedReview.setMark(reviewDetails.getMark());
            updatedReview.setDescription(reviewDetails.getDescription());
            reviewService.saveReview(updatedReview);
            return ResponseEntity.ok(updatedReview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        try {
            reviewService.deleteReview(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @GetMapping("/purchase/{purchaseId}")
    public ResponseEntity<List<Review>> getReviewsByPurchaseId(@PathVariable Long purchaseId) {
        List<Review> reviews = reviewService.getReviewsByPurchaseId(purchaseId);
        if (!reviews.isEmpty()) {
            return ResponseEntity.ok(reviews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/list/{businessId}")
    public ResponseEntity<List<Review>> getReviewsByBusinessId(@PathVariable Long businessId) {
        List<Review> reviews = reviewService.getReviewsByBusinessId(businessId);
        if (!reviews.isEmpty()) {
            return ResponseEntity.ok(reviews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private HttpHeaders errorHeader(Exception e) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Error-Message", e.getMessage());
        return headers;
    }
}