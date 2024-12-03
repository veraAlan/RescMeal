package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.model.Comment;
import dev.group21.rescmeal.model.Delivery;
import dev.group21.rescmeal.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByClientId(Long clientId);

    @Query("FROM Comment C WHERE C.carrier.id = :carrierId")
    Page<Comment> findAllByCarrierId(@Param("carrierId") Long carrierId, Pageable pageable);
}
