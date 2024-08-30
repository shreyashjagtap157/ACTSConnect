package com.connect.acts.ActsConnectBackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Job {
  @Id
  @GeneratedValue(generator = "uuid2")
  @UuidGenerator
  @Column(updatable = false, nullable = false)
  private UUID id;

  @Column(nullable = false)
  private String companyName;

  @Column(nullable = false)
  private String jobTitle;

  @Column(nullable = false)
  private String jobDescription;  // ideally in markdown

  @Column(nullable = false)
  private String jobLocation;

  @Enumerated(EnumType.STRING)
  private JobType jobType = JobType.FULL_TIME; // Full-time, Part-time, Internship, Contract, etc.

  @Column
  private int minExperience;

  @Column
  private double salary;

  @Column(nullable = false)
  private int numOpenPositions;

  @Column
  private String applicationLink;

  @Enumerated(EnumType.STRING)
  private JobStatus jobStatus = JobStatus.OPEN; // Open, Closed, etc.
}
