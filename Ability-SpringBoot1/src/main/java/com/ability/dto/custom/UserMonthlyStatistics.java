package com.ability.dto.custom;

public class UserMonthlyStatistics {
	
	String monthlydate;
	long usercount;
	
	public UserMonthlyStatistics(){};
	
	public UserMonthlyStatistics(String monthlydate, long usercount) {
		super();
		this.monthlydate = monthlydate;
		this.usercount = usercount;
	}

	public String getMonthlydate() {
		return monthlydate;
	}

	public void setMonthlydate(String monthlydate) {
		this.monthlydate = monthlydate;
	}

	public long getUsercount() {
		return usercount;
	}

	public void setUsercount(long usercount) {
		this.usercount = usercount;
	}
	
	
	
	
}
