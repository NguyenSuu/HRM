package brc.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "plan")
public class Plan{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private Date expected_start_date;

	private Date expected_end_date;
	
	private String expected_target;
	
	private Date reality_start_date;
	
	private Date reality_end_date;
	
	private String reality_target;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	

	public Date getExpected_start_date() {
		return expected_start_date;
	}

	public void setExpected_start_date(Date expected_start_date) {
		this.expected_start_date = expected_start_date;
	}

	public Date getExpected_end_date() {
		return expected_end_date;
	}

	public void setExpected_end_date(Date expected_end_date) {
		this.expected_end_date = expected_end_date;
	}

	public Date getReality_start_date() {
		return reality_start_date;
	}

	public void setReality_start_date(Date reality_start_date) {
		this.reality_start_date = reality_start_date;
	}

	public Date getReality_end_date() {
		return reality_end_date;
	}

	public void setReality_end_date(Date reality_end_date) {
		this.reality_end_date = reality_end_date;
	}

	public String getExpected_target() {
		return expected_target;
	}

	public void setExpected_target(String expected_target) {
		this.expected_target = expected_target;
	}

	

	
	public String getReality_target() {
		return reality_target;
	}

	public void setReality_target(String reality_target) {
		this.reality_target = reality_target;
	}
	
	
	

}
