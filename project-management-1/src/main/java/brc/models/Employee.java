package brc.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "employee", uniqueConstraints = { @UniqueConstraint(columnNames = { "id" }) })
public class Employee extends BusinessModels {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	
	private Long preventive_role;
	
	public Employee() {

	}

	public Employee(Long id) {
		this.id = id;
		
	}

	@ManyToOne
	@JoinColumn(name = "position_project_id")
	private Position position;

	@OneToMany(mappedBy = "employee")
	private Set<EmployeeAndProject> employeeAndProjects = new HashSet<>();

	@OneToOne
	@JoinColumn(name = "department_id")
	private Department department;

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public Set<EmployeeAndProject> getEmployeeAndProjects() {
		return employeeAndProjects;
	}

	public void setEmployeeAndProjects(Set<EmployeeAndProject> employeeAndProjects) {
		this.employeeAndProjects = employeeAndProjects;
	}
	
	
	public Long getPreventive_role() {
		return preventive_role;
	}

	public void setPreventive_role(Long preventive_role) {
		this.preventive_role = preventive_role;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Position getPosition() {
		return position;
	}

	public void setPosition(Position position) {
		this.position = position;
	}

}
