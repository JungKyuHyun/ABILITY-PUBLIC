package com.ability.dto.custom;

public class AnswerRate {

	String monthlydate;
	double postcount;
	
	public String getMonthlydate() {
		return monthlydate;
	}
	public void setMonthlydate(String monthlydate) {
		this.monthlydate = monthlydate;
	}
	public double getPostcount() {
		return postcount;
	}
	public void setPostcount(double postcount) {
		this.postcount = postcount;
	}
	@Override
	public String toString() {
		return "AnswerRate [monthlydate=" + monthlydate + ", postcount=" + postcount + "]";
	}

	
	
}
