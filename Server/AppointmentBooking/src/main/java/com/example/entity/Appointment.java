package com.example.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data

public class Appointment {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private LocalDateTime appointmentTime;
    private String appointmentTitle;
    private String appointmentChannel;
    private String appointmentType;
    private boolean isWalkIn;
    private String bloodPressure;
    private double temperature;
    private double height;
    private double weight;
    private int spo2;
    private int pulseRate;
    private String reason;
    private String note;

}

