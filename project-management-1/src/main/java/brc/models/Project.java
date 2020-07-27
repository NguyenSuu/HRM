package brc.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;



@Entity
@Table(name = "project")

public class Project extends BusinessModels{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String code;
	
	private String name;
	
	private String notes;
	
	private String numberOfMember;
	

	@OneToMany(mappedBy ="project")
	private Set<EmployeeAndProject> employeeAndProjects =new HashSet<>();
	
	
	public Set<EmployeeAndProject> getEmployeeAndProjects() {
		return employeeAndProjects;
	}

	public void setEmployeeAndProjects(Set<EmployeeAndProject> employeeAndProjects) {
		this.employeeAndProjects = employeeAndProjects;
	}
	
	@OneToOne
	@JoinColumn(name = "department_id")
	private Department department;
	
	@OneToOne
	@JoinColumn(name = "level_project_id")
	private LevelProject level;
	
	@OneToOne
	@JoinColumn(name = "status_project_id")
	private StatusProject status;
	
	@OneToOne
	@JoinColumn(name = "plan_id")
	private Plan plan;
	
	@OneToOne
	@JoinColumn(name = "cassification_project_id")
	private ClassificationProject cassificationProject;
	
	@OneToOne
	@JoinColumn(name = "cassification_id")
	private Classification cassification ;
	
	@OneToOne
	@JoinColumn(name = "technology_id")
	private Technology technology ;
	
	

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getNumberOfMember() {
		return numberOfMember;
	}

	

	public Technology getTechnology() {
		return technology;
	}

	public void setTechnology(Technology technology) {
		this.technology = technology;
	}

	public void setNumberOfMember(String numberOfMember) {
		this.numberOfMember = numberOfMember;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LevelProject getLevel() {
		return level;
	}

	public void setLevel(LevelProject level) {
		this.level = level;
	}

	public StatusProject getStatus() {
		return status;
	}

	public void setStatus(StatusProject status) {
		this.status = status;
	}

	public Plan getPlan() {
		return plan;
	}

	public void setPlan(Plan plan) {
		this.plan = plan;
	}

	public ClassificationProject getCassificationProject() {
		return cassificationProject;
	}

	public void setCassificationProject(ClassificationProject cassificationProject) {
		this.cassificationProject = cassificationProject;
	}

	public Classification getCassification() {
		return cassification;
	}

	public void setCassification(Classification cassification) {
		this.cassification = cassification;
	}

}
