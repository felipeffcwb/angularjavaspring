package com.projectstudy.projectstudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages={"com.projectstudy.projectstudy.controller"})
@SpringBootApplication
public class ProjectStudyApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectStudyApplication.class, args);
    }

}
