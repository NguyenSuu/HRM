package brc.models;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "employee_projects")
public class EmployeeAndProject implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@ManyToOne
	@JoinColumn(name = "employee_id")
	private Employee employee;

	@Id
	@ManyToOne
	@JoinColumn(name = "project_id")
	private Project project;

	@ManyToOne
	@JoinColumn(name = "role_id")
	private RoleProject role_project;

	private LocalDate joinAt;

	private boolean isOut;

	private Long id_employee;

	private Long id_project;

	public RoleProject getRole_project() {
		return role_project;
	}

	public void setRole_project(RoleProject role_project) {
		this.role_project = role_project;
	}

	public Long getId_employee() {
		return id_employee;
	}

	public void setId_employee(Long id_employee) {
		this.id_employee = id_employee;
	}

	public Long getId_project() {
		return id_project;
	}

	public void setId_project(Long id_project) {
		this.id_project = id_project;
	}

	public LocalDate getJoinAt() {
		return joinAt;
	}

	public void setJoinAt(LocalDate joinAt) {
		this.joinAt = joinAt;
	}

	public boolean isOut() {
		return isOut;
	}

	public void setOut(boolean isOut) {
		this.isOut = isOut;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public void setProject(Project project) {
		this.project = project;
	}

}
