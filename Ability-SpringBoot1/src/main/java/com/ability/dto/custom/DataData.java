package com.ability.dto.custom;

import java.io.Serializable;

/**
 * 
 * @author 정규현
 * @summary 레디스용 디티오
 *
 */

public class DataData implements Serializable {
	private static final long serialVersionUID = 1L;
	private String id;
	private String item;
	
	public DataData() {}
	public DataData(String id, String item) {
		super();
		this.id = id;
		this.item = item;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	
	
	
}
