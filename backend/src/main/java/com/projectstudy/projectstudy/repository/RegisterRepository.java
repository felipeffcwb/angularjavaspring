package com.projectstudy.projectstudy.repository;

import com.projectstudy.projectstudy.model.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterRepository extends JpaRepository<Register, Integer> {
    public Register findByEmail(String email);
}
