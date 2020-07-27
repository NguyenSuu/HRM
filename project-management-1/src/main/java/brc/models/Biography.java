package brc.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "biography")
public class Biography {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private LocalDate time;
	
	private int number;
	
	@ManyToOne
	@JoinColumn(name = "status_project_id")
	private StatusProject statusProject;
	
	@ManyToOne
	@JoinColumn(name = "project_id")
	private Project project;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getTime() {
		return time;
	}

	public void setTime(LocalDate time) {
		this.time = time;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public StatusProject getStatusProject() {
		return statusProject;
	}

	public void setStatusProject(StatusProject statusProject) {
		this.statusProject = statusProject;
	}
	
	
	
}
