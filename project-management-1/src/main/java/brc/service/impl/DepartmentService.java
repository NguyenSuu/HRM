package brc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import brc.models.Department;
import brc.repository.DepartmentRepository;
import brc.service.IService;

@Service
public class DepartmentService implements IService<Department> {
	@Autowired
	private DepartmentRepository departmentRes;
	@Override
	public List<Department> findAll() {
		return this.departmentRes.findAll();
	}

	@Override
	public Department save(Department t) {
		return this.departmentRes.save(t);
	}

	@Override
	public void remove(Long id) {
		this.departmentRes.deleteById(id);
		
	}
	public Department findById(Long id) {
		return this.departmentRes.findEntity(id);
	}
	

}
