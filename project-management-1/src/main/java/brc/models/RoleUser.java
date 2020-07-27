package brc.models;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "role_users")
public class RoleUser implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Id
	@ManyToOne
	@JoinColumn(name = "role_id")
	private Roles role;

	private String name;
	
	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public void setRoles(Roles role) {
		this.role = role;
	}
	
}