package com.ability.dto;

import java.sql.Date;

public class Visit {
	private int id;
	private Date visit_day;
	private String visit_ip;
	private String visit_refer;
	private String visit_user_agent;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getVisit_day() {
		return visit_day;
	}

	public void setVisit_day(Date visit_day) {
		this.visit_day = visit_day;
	}

	public String getVisit_ip() {
		return visit_ip;
	}

	public void setVisit_ip(String visit_ip) {
		this.visit_ip = visit_ip;
	}

	public String getVisit_refer() {
		return visit_refer;
	}

	public void setVisit_refer(String visit_refer) {
		this.visit_refer = visit_refer;
	}

	public String getVisit_user_agent() {
		return visit_user_agent;
	}

	public void setVisit_user_agent(String visit_user_agent) {
		this.visit_user_agent = visit_user_agent;
	}

	@Override
	public String toString() {
		return "Visit [id=" + id + ", visit_day=" + visit_day + ", visit_ip=" + visit_ip + ", visit_refer="
				+ visit_refer + ", visit_user_agent=" + visit_user_agent + "]";
	}

}
