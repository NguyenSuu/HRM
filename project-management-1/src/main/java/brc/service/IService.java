package brc.service;

import java.util.List;

public interface IService<T> {
	
	List<T> findAll();
	
	T save(T t);
	
	void remove(Long id);

}
