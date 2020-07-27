package brc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import brc.models.RoleProject;
import brc.repository.RoleProjectRepository;
import brc.service.IService;

@Service
public class RoleProjectService implements IService<RoleProject>{
	@Autowired
	private RoleProjectRepository roleRos;
	@Override
	public List<RoleProject> findAll() {
		
		return this.roleRos.findAll();
	}
	
	public RoleProject findEntity(Long id) {
		return this.roleRos.findEntity(id);
	}
	@Override
	public RoleProject save(RoleProject t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void remove(Long id) {
		// TODO Auto-generated method stub
		
	}

}
