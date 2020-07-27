package brc.repository.specification;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import brc.models.Project;

public class ProjectSpecification implements Specification<Project> {
	private Project project;

	public ProjectSpecification(Project project) {
		super();
		this.project = project;
	}

	@Override
	public Predicate toPredicate(Root<Project> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

		List<Predicate> predicates = new ArrayList<Predicate>();
		Predicate isDelete = criteriaBuilder.equal(root.get("isDelete"),false);
		predicates.add(isDelete);
		if (project.getStatus().getId() != null) {
			Predicate status = criteriaBuilder.equal(root.get("status"), project.getStatus());
			predicates.add(status);
		}
		if (project.getDepartment().getId() != null) {
			Predicate department = criteriaBuilder.equal((root.get("department")), project.getDepartment());
			predicates.add(department);
		}
		if (project.getLevel().getId() != null) {
			Predicate level = criteriaBuilder.equal((root.get("level")), project.getLevel());
			predicates.add(level);
		}
		if (project.getTechnology().getId() != null) {
			Predicate technology = criteriaBuilder.equal((root.get("technology")), project.getTechnology());
			predicates.add(technology);
		}
		if (project.getName()!= null) {
			Predicate name = criteriaBuilder.like((root.get("name")),"%" + project.getName()+"%" );
			predicates.add(name);
		}
		if (project.getCode()!= null) {
			Predicate code = criteriaBuilder.like((root.get("code")),"%" + project.getCode()+"%" );
			predicates.add(code);
		}
		
		return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
	}

}
